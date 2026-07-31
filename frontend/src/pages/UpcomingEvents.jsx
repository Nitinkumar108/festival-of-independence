import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function UpcomingEvents() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({});

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    setLoading(true);
    try {
      const res = await api.get("/events");
      setEvents(res.data);
    } catch (err) {
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(eventId) {
    if (!user || user.role !== "student") return;
    setActionLoading((prev) => ({ ...prev, [eventId]: true }));
    try {
      await api.post(`/events/${eventId}/register`);
      setEvents((prev) =>
        prev.map((e) =>
          e.id === eventId
            ? { ...e, isRegistered: true, registrationCount: (e.registrationCount || 0) + 1 }
            : e
        )
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to register for event.");
    } finally {
      setActionLoading((prev) => ({ ...prev, [eventId]: false }));
    }
  }

  async function handleUnregister(eventId) {
    if (!user || user.role !== "student") return;
    setActionLoading((prev) => ({ ...prev, [eventId]: true }));
    try {
      await api.delete(`/events/${eventId}/register`);
      setEvents((prev) =>
        prev.map((e) =>
          e.id === eventId
            ? { ...e, isRegistered: false, registrationCount: Math.max(0, (e.registrationCount || 1) - 1) }
            : e
        )
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to cancel registration.");
    } finally {
      setActionLoading((prev) => ({ ...prev, [eventId]: false }));
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl font-extrabold text-navy sm:text-4xl mb-3">Upcoming Programs & Events</h1>
        <p className="text-gray-600">
          Discover and register for upcoming festival workshops, lectures, and interactive sessions.
        </p>
      </div>

      {loading && <p className="text-gray-500 text-center py-10">Loading upcoming programs…</p>}

      {!loading && events.length === 0 && (
        <div className="text-center py-12 border rounded-xl bg-gray-50">
          <p className="text-gray-500">No programs scheduled at the moment. Please check back soon!</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {events.map((e) => (
          <div key={e.id} className="border rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              {e.posterUrl ? (
                <img
                  src={e.posterUrl}
                  alt={e.title}
                  className="w-full h-52 object-cover"
                />
              ) : (
                <div className="w-full h-44 bg-gradient-to-r from-navy to-indigo-900 flex items-center justify-center p-4">
                  <h2 className="text-2xl font-bold text-white text-center">{e.title}</h2>
                </div>
              )}

              <div className="p-6">
                <h3 className="text-xl font-bold text-navy mb-2">{e.title}</h3>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mb-3">
                  <span>📅 {new Date(e.dateTime).toLocaleString()}</span>
                  {e.venue && <span>📍 {e.venue}</span>}
                </div>

                {e.description && (
                  <p className="text-sm text-gray-700 leading-relaxed mb-4 whitespace-pre-wrap">
                    {e.description}
                  </p>
                )}
              </div>
            </div>

            <div className="px-6 pb-6 pt-2 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500">
                👥 {e.registrationCount || 0} Registered
              </span>

              {user?.role === "student" ? (
                e.isRegistered ? (
                  <button
                    onClick={() => handleUnregister(e.id)}
                    disabled={actionLoading[e.id]}
                    className="bg-emerald-100 text-emerald-800 text-xs font-bold px-4 py-2 rounded-lg border border-emerald-300 hover:bg-emerald-200 transition-colors"
                  >
                    {actionLoading[e.id] ? "Processing..." : "✓ Registered (Cancel)"}
                  </button>
                ) : (
                  <button
                    onClick={() => handleRegister(e.id)}
                    disabled={actionLoading[e.id]}
                    className="bg-saffron text-navy text-xs font-bold px-5 py-2.5 rounded-lg hover:opacity-90 transition-all shadow-xs"
                  >
                    {actionLoading[e.id] ? "Registering..." : "Register Now"}
                  </button>
                )
              ) : !user ? (
                <Link
                  to="/login"
                  className="bg-navy text-white text-xs font-semibold px-4 py-2 rounded-lg hover:opacity-90"
                >
                  Log in to Register
                </Link>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
