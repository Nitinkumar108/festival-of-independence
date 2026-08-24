import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios.js";
import {
  GraduationCap,
  Building2,
  Download,
  Users,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const PAGE_SIZE = 25;

export default function ClusterDashboard() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [cluster, setCluster] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("No access token provided. Please use the link shared by your administrator.");
      setLoading(false);
      return;
    }
    fetchClusterData();
  }, [token]);

  useEffect(() => {
    const q = search.toLowerCase();
    const results = registrations.filter(
      (r) =>
        r.fullName?.toLowerCase().includes(q) ||
        r.college?.toLowerCase().includes(q) ||
        r.email?.toLowerCase().includes(q) ||
        r.phoneNumber?.includes(q)
    );
    setFiltered(results);
    setPage(1);
  }, [search, registrations]);

  async function fetchClusterData() {
    setLoading(true);
    setError("");
    try {
      const [clusterRes, regRes] = await Promise.all([
        api.get(`/clusters/by-token?token=${token}`),
        api.get(`/clusters/by-token/registrations?token=${token}`),
      ]);
      setCluster(clusterRes.data);
      setRegistrations(regRes.data);
      setFiltered(regRes.data);
    } catch (err) {
      const msg = err.response?.data?.message;
      if (err.response?.status === 403) {
        setError("This link is invalid or has been revoked. Please contact your administrator for a new link.");
      } else {
        setError(msg || "Failed to load cluster data. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleDownloadExcel() {
    setDownloading(true);
    try {
      const res = await api.get(`/clusters/by-token/export?token=${token}`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${cluster?.code || "cluster"}-registrations.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch {
      // silent
    } finally {
      setDownloading(false);
    }
  }

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // ── Loading ──────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F4F8] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold text-gray-500">Loading cluster data…</p>
        </div>
      </div>
    );
  }

  // ── Error / Invalid token ─────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="min-h-screen bg-[#F4F4F8] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-lg p-8 text-center space-y-4 border border-red-100">
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-xl font-black text-gray-800">Access Denied</h1>
          <p className="text-sm text-gray-500 leading-relaxed">{error}</p>
        </div>
      </div>
    );
  }

  // ── Main dashboard ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F4F4F8] font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold tracking-widest uppercase text-orange-100 bg-white/20 px-3 py-1 rounded-full">
                  Festival of Independence · IYF Kolkata
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                Cluster {cluster?.code}
              </h1>
              <p className="text-orange-100 font-semibold mt-1">
                Facilitator: {cluster?.facilitatorName || "—"}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={fetchClusterData}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur border border-white/30 text-white font-bold text-sm px-4 py-2.5 rounded-xl transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <button
                onClick={handleDownloadExcel}
                disabled={downloading}
                className="flex items-center gap-2 bg-white text-orange-600 hover:bg-orange-50 font-bold text-sm px-4 py-2.5 rounded-xl transition-all shadow-md disabled:opacity-60"
              >
                <Download className="w-4 h-4" />
                {downloading ? "Generating…" : "Download Excel"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Registrations</p>
              <p className="text-3xl font-black text-gray-800">{registrations.length}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Colleges in Cluster</p>
              <p className="text-3xl font-black text-gray-800">{cluster?.collegeCount ?? "—"}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Results Shown</p>
              <p className="text-3xl font-black text-gray-800">{filtered.length}</p>
            </div>
          </div>
        </div>

        {/* Colleges list */}
        {cluster?.colleges?.length > 0 && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h2 className="text-sm font-black text-gray-700 uppercase tracking-wider mb-3">
              Colleges in {cluster.code}
            </h2>
            <div className="flex flex-wrap gap-2">
              {cluster.colleges.map((c) => (
                <span
                  key={c.id}
                  className="text-xs font-semibold bg-orange-50 text-orange-700 border border-orange-200 px-3 py-1 rounded-full"
                >
                  {c.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Registrations Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 border-b border-gray-100">
            <h2 className="text-base font-black text-gray-800">
              Registrations
              <span className="ml-2 text-xs font-bold text-gray-400">({filtered.length} of {registrations.length})</span>
            </h2>
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, college, email…"
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <GraduationCap className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-semibold">No registrations found</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">#</th>
                      <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">College</th>
                      <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Phone</th>
                      <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Payment</th>
                      <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Registered</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {paginated.map((student, idx) => (
                      <tr key={student.id} className="hover:bg-orange-50/30 transition-colors">
                        <td className="px-4 py-3 text-xs text-gray-400 font-mono">
                          {(page - 1) * PAGE_SIZE + idx + 1}
                        </td>
                        <td className="px-4 py-3">
                          <p className="font-semibold text-gray-800">{student.fullName}</p>
                          <p className="text-xs text-gray-400 font-mono">{student.id.slice(0, 8)}…</p>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 max-w-[180px]">
                          {student.college}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 font-mono">{student.phoneNumber}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{student.email}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
                              student.paymentStatus === "Paid"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {student.paymentStatus === "Paid" && <CheckCircle2 className="w-3 h-3" />}
                            {student.paymentStatus}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-500">
                          {new Date(student.registeredOn).toLocaleDateString("en-IN")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 font-medium">
                    Page {page} of {totalPages} · {filtered.length} registrations
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-all"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-gray-400 pb-4">
          Festival of Independence · IYF Kolkata · Data is live from the database
        </p>
      </div>
    </div>
  );
}
