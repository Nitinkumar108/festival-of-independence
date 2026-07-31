import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("students"); // 'students', 'colleges', 'notifications', 'events', 'team', 'profile'

  // Students state
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [loadingStudents, setLoadingStudents] = useState(true);

  // Notifications state
  const [notifications, setNotifications] = useState([]);
  const [notifTitle, setNotifTitle] = useState("");
  const [notifMessage, setNotifMessage] = useState("");
  const [sendingNotif, setSendingNotif] = useState(false);
  const [notifFeedback, setNotifFeedback] = useState("");

  // Events state
  const [events, setEvents] = useState([]);
  const [eventForm, setEventForm] = useState({
    title: "",
    posterUrl: "",
    description: "",
    dateTime: "",
    venue: "",
    joiningLink: "",
  });
  const [creatingEvent, setCreatingEvent] = useState(false);
  const [eventFeedback, setEventFeedback] = useState("");
  const [selectedEventAttendees, setSelectedEventAttendees] = useState(null);
  const [attendeesList, setAttendeesList] = useState([]);
  const [loadingAttendees, setLoadingAttendees] = useState(false);

  // Colleges state
  const [colleges, setColleges] = useState([]);
  const [collegeName, setCollegeName] = useState("");
  const [collegeCity, setCollegeCity] = useState("");
  const [addingCollege, setAddingCollege] = useState(false);
  const [collegeFeedback, setCollegeFeedback] = useState("");

  // Admin Team state
  const [adminTeam, setAdminTeam] = useState([]);
  const [adminForm, setAdminForm] = useState({ name: "", email: "", password: "", role: "VolunteerAdmin" });
  const [addingAdmin, setAddingAdmin] = useState(false);
  const [adminFeedback, setAdminFeedback] = useState("");

  // Admin Profile Form State
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "IYF Kolkata Admin",
    email: user?.email || "nitin.231218@gmail.com",
    role: user?.role || "SuperAdmin",
  });

  useEffect(() => {
    if (activeTab === "students") fetchStudents();
    if (activeTab === "notifications") fetchNotifications();
    if (activeTab === "events") fetchEvents();
    if (activeTab === "colleges") fetchColleges();
    if (activeTab === "team") fetchAdminTeam();
  }, [activeTab, paymentStatus]);

  async function fetchStudents() {
    setLoadingStudents(true);
    try {
      const res = await api.get("/admin/students", {
        params: { search: search || undefined, paymentStatus: paymentStatus || undefined },
      });
      setStudents(res.data);
    } finally {
      setLoadingStudents(false);
    }
  }

  async function handleDeleteStudent(id, name) {
    if (!confirm(`Are you sure you want to delete the student account for "${name}"?`)) return;
    try {
      await api.delete(`/admin/students/${id}`);
      fetchStudents();
    } catch (err) {
      alert("Failed to delete student account.");
    }
  }

  async function fetchNotifications() {
    try {
      const res = await api.get("/admin/notifications");
      setNotifications(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchEvents() {
    try {
      const res = await api.get("/events");
      setEvents(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchColleges() {
    try {
      const res = await api.get("/colleges");
      setColleges(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchAdminTeam() {
    try {
      const res = await api.get("/admin/team");
      setAdminTeam(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleExport() {
    const res = await api.get("/admin/students/export", { responseType: "blob" });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "festival-of-independence-registrations.xlsx");
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  async function handleSendNotification(e) {
    e.preventDefault();
    if (!notifTitle || !notifMessage) return;
    setSendingNotif(true);
    setNotifFeedback("");
    try {
      await api.post("/admin/notifications", { title: notifTitle, message: notifMessage });
      setNotifTitle("");
      setNotifMessage("");
      setNotifFeedback("Notification broadcasted successfully!");
      fetchNotifications();
    } catch (err) {
      setNotifFeedback("Failed to send notification.");
    } finally {
      setSendingNotif(false);
    }
  }

  async function handleDeleteNotification(id) {
    if (!confirm("Delete this notification?")) return;
    try {
      await api.delete(`/admin/notifications/${id}`);
      fetchNotifications();
    } catch (err) {
      alert("Failed to delete notification.");
    }
  }

  async function handleCreateEvent(e) {
    e.preventDefault();
    if (!eventForm.title || !eventForm.dateTime) return;
    setCreatingEvent(true);
    setEventFeedback("");
    try {
      await api.post("/events", eventForm);
      setEventForm({
        title: "",
        posterUrl: "",
        description: "",
        dateTime: "",
        venue: "",
        joiningLink: "",
      });
      setEventFeedback("Program scheduled successfully!");
      fetchEvents();
    } catch (err) {
      setEventFeedback("Failed to schedule program.");
    } finally {
      setCreatingEvent(false);
    }
  }

  async function handleDeleteEvent(id) {
    if (!confirm("Delete this program/event?")) return;
    try {
      await api.delete(`/events/${id}`);
      fetchEvents();
    } catch (err) {
      alert("Failed to delete event.");
    }
  }

  async function handleViewAttendees(event) {
    setSelectedEventAttendees(event);
    setLoadingAttendees(true);
    try {
      const res = await api.get(`/events/${event.id}/registrations`);
      setAttendeesList(res.data);
    } catch (err) {
      setAttendeesList([]);
    } finally {
      setLoadingAttendees(false);
    }
  }

  async function handleAddCollege(e) {
    e.preventDefault();
    if (!collegeName) return;
    setAddingCollege(true);
    setCollegeFeedback("");
    try {
      await api.post("/colleges", { name: collegeName, city: collegeCity });
      setCollegeName("");
      setCollegeCity("");
      setCollegeFeedback("College added successfully! It will now appear in registration form.");
      fetchColleges();
    } catch (err) {
      setCollegeFeedback(err.response?.data?.message || "Failed to add college.");
    } finally {
      setAddingCollege(false);
    }
  }

  async function handleDeleteCollege(id) {
    if (!confirm("Delete this college?")) return;
    try {
      await api.delete(`/colleges/${id}`);
      fetchColleges();
    } catch (err) {
      alert("Failed to delete college.");
    }
  }

  async function handleAddAdmin(e) {
    e.preventDefault();
    if (!adminForm.name || !adminForm.email || !adminForm.password) return;
    setAddingAdmin(true);
    setAdminFeedback("");
    try {
      await api.post("/admin/team", adminForm);
      setAdminForm({ name: "", email: "", password: "", role: "VolunteerAdmin" });
      setAdminFeedback("New admin account created successfully!");
      fetchAdminTeam();
    } catch (err) {
      setAdminFeedback(err.response?.data?.message || "Failed to create admin account.");
    } finally {
      setAddingAdmin(false);
    }
  }

  async function handleDeleteAdmin(id, name) {
    if (!confirm(`Remove admin account for "${name}"?`)) return;
    try {
      await api.delete(`/admin/team/${id}`);
      fetchAdminTeam();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete admin account.");
    }
  }

  function handleLogoutClick() {
    logout();
    navigate("/");
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-amber-50/30 via-slate-50/50 to-amber-50/20 py-8 sm:py-12 px-3 sm:px-6">
      
      {/* Master Card Dashboard Container */}
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100/80 overflow-hidden">
        <div className="grid md:grid-cols-12 min-h-[660px]">
          
          {/* Left Column: Admin Profile Sidebar Nav (4 Cols) */}
          <div className="md:col-span-4 bg-slate-50/80 border-r border-gray-100 p-6 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Admin Avatar & Header Info */}
              <div className="flex flex-col items-center text-center pt-2">
                <div className="relative mb-3.5 group">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-navy via-slate-800 to-saffron text-white flex items-center justify-center font-extrabold text-3xl shadow-md ring-4 ring-white">
                    {profileForm.name?.charAt(0).toUpperCase() || "A"}
                  </div>
                  <button
                    aria-label="Edit Profile Avatar"
                    className="absolute bottom-0.5 right-1 w-7.5 h-7.5 bg-saffron text-navy rounded-full flex items-center justify-center text-xs shadow-md hover:scale-110 transition-transform ring-2 ring-white"
                  >
                    ✏️
                  </button>
                </div>

                <h2 className="text-xl font-bold tracking-tight text-navy mb-0.5">{profileForm.name}</h2>
                <p className="text-xs font-medium text-gray-500 mb-2">
                  {profileForm.email}
                </p>
                <span className="text-[11px] font-bold text-saffron bg-saffron/10 px-3 py-1 rounded-full border border-saffron/30">
                  🛡️ {profileForm.role}
                </span>
              </div>

              {/* Sidebar Menu Items */}
              <nav className="space-y-1.5 pt-2">
                <button
                  onClick={() => setActiveTab("students")}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                    activeTab === "students"
                      ? "bg-amber-100/70 text-saffron shadow-2xs"
                      : "text-gray-600 hover:bg-gray-100/80"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-base">🎓</span> Student Registrations
                  </span>
                  {students.length > 0 && (
                    <span className="text-[10px] font-extrabold bg-white text-navy px-2 py-0.5 rounded-full border border-gray-200">
                      {students.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab("colleges")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                    activeTab === "colleges"
                      ? "bg-amber-100/70 text-saffron shadow-2xs"
                      : "text-gray-600 hover:bg-gray-100/80"
                  }`}
                >
                  <span className="text-base">🏫</span> Colleges & Institutions
                </button>

                <button
                  onClick={() => setActiveTab("notifications")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                    activeTab === "notifications"
                      ? "bg-amber-100/70 text-saffron shadow-2xs"
                      : "text-gray-600 hover:bg-gray-100/80"
                  }`}
                >
                  <span className="text-base">📢</span> Broadcast Notifications
                </button>

                <button
                  onClick={() => setActiveTab("events")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                    activeTab === "events"
                      ? "bg-amber-100/70 text-saffron shadow-2xs"
                      : "text-gray-600 hover:bg-gray-100/80"
                  }`}
                >
                  <span className="text-base">📅</span> Manage Events & Programs
                </button>

                <button
                  onClick={() => setActiveTab("team")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                    activeTab === "team"
                      ? "bg-amber-100/70 text-saffron shadow-2xs"
                      : "text-gray-600 hover:bg-gray-100/80"
                  }`}
                >
                  <span className="text-base">👥</span> Admin Team Management
                </button>

                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                    activeTab === "profile"
                      ? "bg-amber-100/70 text-saffron shadow-2xs"
                      : "text-gray-600 hover:bg-gray-100/80"
                  }`}
                >
                  <span className="text-base">👤</span> Admin Profile Info
                </button>
              </nav>

            </div>

            {/* Logout Action at Bottom */}
            <div className="pt-5 border-t border-gray-200/80">
              <button
                onClick={handleLogoutClick}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <span className="text-base">🚪</span> Log Out
              </button>
            </div>

          </div>

          {/* Right Column: Active Tab Content (8 Cols) */}
          <div className="md:col-span-8 p-6 sm:p-10 flex flex-col justify-between">
            
            {/* TAB 1: STUDENT REGISTRATIONS */}
            {activeTab === "students" && (
              <div className="space-y-6">
                <div className="border-b border-gray-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-extrabold tracking-tight text-navy">Student Registrations</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Filter, search, and manage registered student accounts.</p>
                  </div>
                  <button
                    onClick={handleExport}
                    className="bg-navy text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-saffron hover:text-navy transition-all shadow-xs self-start sm:self-auto"
                  >
                    📊 Export to Excel
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && fetchStudents()}
                    placeholder="Search by name, email, or phone"
                    className="flex-1 bg-gray-100/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-saffron transition-all border-0"
                  />
                  <select
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value)}
                    className="bg-gray-100/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-saffron transition-all border-0"
                  >
                    <option value="">All Statuses</option>
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                  </select>
                  <button
                    onClick={fetchStudents}
                    className="bg-saffron text-navy text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-saffron/90 transition-all shadow-2xs"
                  >
                    Search
                  </button>
                </div>

                <div className="overflow-x-auto border border-gray-100 rounded-2xl shadow-2xs">
                  <table className="w-full text-xs sm:text-sm">
                    <thead className="bg-navy text-white font-bold">
                      <tr>
                        <th className="text-left px-4 py-3">Name</th>
                        <th className="text-left px-4 py-3">Email</th>
                        <th className="text-left px-4 py-3">College</th>
                        <th className="text-left px-4 py-3">Phone</th>
                        <th className="text-left px-4 py-3">Status</th>
                        <th className="text-right px-4 py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loadingStudents && (
                        <tr>
                          <td colSpan={6} className="text-center py-6 text-gray-500">
                            Loading students...
                          </td>
                        </tr>
                      )}
                      {!loadingStudents && students.length === 0 && (
                        <tr>
                          <td colSpan={6} className="text-center py-6 text-gray-500">
                            No student registrations found.
                          </td>
                        </tr>
                      )}
                      {students.map((s, i) => (
                        <tr key={s.id} className={i % 2 === 1 ? "bg-gray-50/50" : "bg-white"}>
                          <td className="px-4 py-3 font-bold text-navy">{s.fullName}</td>
                          <td className="px-4 py-3 text-gray-700">{s.email}</td>
                          <td className="px-4 py-3 text-gray-700">{s.College?.name || "—"}</td>
                          <td className="px-4 py-3 text-gray-700">{s.phoneNumber}</td>
                          <td className="px-4 py-3">
                            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                              ✓ Confirmed (Free)
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button
                              onClick={() => handleDeleteStudent(s.id, s.fullName)}
                              className="text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-xl border border-red-200 transition-colors"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 2: COLLEGES & INSTITUTIONS */}
            {activeTab === "colleges" && (
              <div className="space-y-6">
                <div className="border-b border-gray-100 pb-3">
                  <h2 className="text-xl font-extrabold tracking-tight text-navy">Colleges & Institutions</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Manage list of colleges available in registration options.</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Add College Form */}
                  <div className="bg-gray-50/80 rounded-2xl p-5 border border-gray-100 space-y-4">
                    <h3 className="text-sm font-extrabold text-navy">Add New College</h3>
                    <form onSubmit={handleAddCollege} className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">College Name *</label>
                        <input
                          value={collegeName}
                          onChange={(e) => setCollegeName(e.target.value)}
                          placeholder="e.g. St. Xavier's College, Kolkata"
                          required
                          className="w-full bg-white rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold border border-gray-200 focus:ring-2 focus:ring-saffron"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">City / Location</label>
                        <input
                          value={collegeCity}
                          onChange={(e) => setCollegeCity(e.target.value)}
                          placeholder="e.g. Kolkata"
                          className="w-full bg-white rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold border border-gray-200 focus:ring-2 focus:ring-saffron"
                        />
                      </div>
                      {collegeFeedback && (
                        <p className={`text-xs font-bold ${collegeFeedback.includes("successfully") ? "text-emerald-600" : "text-red-600"}`}>
                          {collegeFeedback}
                        </p>
                      )}
                      <button
                        type="submit"
                        disabled={addingCollege}
                        className="w-full bg-saffron text-navy font-bold text-xs py-3 rounded-xl hover:bg-saffron/90 transition-all shadow-xs disabled:opacity-50"
                      >
                        {addingCollege ? "Adding..." : "Add College Option"}
                      </button>
                    </form>
                  </div>

                  {/* List of Colleges */}
                  <div>
                    <h3 className="text-sm font-extrabold text-navy mb-3">Registered Colleges ({colleges.length})</h3>
                    {colleges.length === 0 ? (
                      <p className="text-xs text-gray-500 italic">No colleges added yet.</p>
                    ) : (
                      <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                        {colleges.map((c) => (
                          <div key={c.id} className="bg-gray-50/80 rounded-xl p-3 border border-gray-100 flex justify-between items-center text-xs">
                            <div>
                              <p className="font-bold text-navy">{c.name}</p>
                              {c.city && <p className="text-[11px] text-gray-500">📍 {c.city}</p>}
                            </div>
                            <button
                              onClick={() => handleDeleteCollege(c.id)}
                              className="text-xs font-bold text-red-600 hover:bg-red-50 px-2 py-1 rounded-lg border border-red-200"
                            >
                              Delete
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: BROADCAST NOTIFICATIONS */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div className="border-b border-gray-100 pb-3">
                  <h2 className="text-xl font-extrabold tracking-tight text-navy">Broadcast Notifications</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Send common updates and announcements to all student dashboards.</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Create Broadcast Form */}
                  <div className="bg-gray-50/80 rounded-2xl p-5 border border-gray-100 space-y-4">
                    <h3 className="text-sm font-extrabold text-navy">New Broadcast Message</h3>
                    <form onSubmit={handleSendNotification} className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Title *</label>
                        <input
                          value={notifTitle}
                          onChange={(e) => setNotifTitle(e.target.value)}
                          placeholder="e.g. Session Schedule Update"
                          required
                          className="w-full bg-white rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold border border-gray-200 focus:ring-2 focus:ring-saffron"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Message *</label>
                        <textarea
                          value={notifMessage}
                          onChange={(e) => setNotifMessage(e.target.value)}
                          placeholder="Write message content..."
                          rows={4}
                          required
                          className="w-full bg-white rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold border border-gray-200 focus:ring-2 focus:ring-saffron"
                        />
                      </div>
                      {notifFeedback && (
                        <p className={`text-xs font-bold ${notifFeedback.includes("successfully") ? "text-emerald-600" : "text-red-600"}`}>
                          {notifFeedback}
                        </p>
                      )}
                      <button
                        type="submit"
                        disabled={sendingNotif}
                        className="w-full bg-saffron text-navy font-bold text-xs py-3 rounded-xl hover:bg-saffron/90 transition-all shadow-xs disabled:opacity-50"
                      >
                        {sendingNotif ? "Broadcasting..." : "Broadcast Announcement"}
                      </button>
                    </form>
                  </div>

                  {/* Sent History */}
                  <div>
                    <h3 className="text-sm font-extrabold text-navy mb-3">Broadcast History</h3>
                    {notifications.length === 0 ? (
                      <p className="text-xs text-gray-500 italic">No broadcast notifications sent yet.</p>
                    ) : (
                      <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                        {notifications.map((n) => (
                          <div key={n.id} className="bg-amber-50/60 rounded-2xl p-4 border border-amber-200/70 relative">
                            <div className="flex justify-between items-start mb-1 pr-6">
                              <h4 className="font-bold text-navy text-xs sm:text-sm">{n.title}</h4>
                              <button
                                onClick={() => handleDeleteNotification(n.id)}
                                className="text-xs font-bold text-red-600 hover:underline"
                              >
                                Delete
                              </button>
                            </div>
                            <p className="text-[10px] text-gray-400 mb-1">{new Date(n.createdAt).toLocaleString()}</p>
                            <p className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed">{n.message}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: EVENT & PROGRAM SCHEDULING */}
            {activeTab === "events" && (
              <div className="space-y-6">
                <div className="border-b border-gray-100 pb-3">
                  <h2 className="text-xl font-extrabold tracking-tight text-navy">Manage Events & Programs</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Schedule workshops, live classes, and retreats.</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Event Form */}
                  <div className="bg-gray-50/80 rounded-2xl p-5 border border-gray-100 space-y-3 text-xs sm:text-sm">
                    <h3 className="text-sm font-extrabold text-navy">Schedule New Program</h3>
                    <form onSubmit={handleCreateEvent} className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Title *</label>
                        <input
                          value={eventForm.title}
                          onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                          placeholder="Program Title"
                          required
                          className="w-full bg-white rounded-xl px-4 py-2.5 font-semibold border border-gray-200"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Date & Time *</label>
                        <input
                          type="datetime-local"
                          value={eventForm.dateTime}
                          onChange={(e) => setEventForm({ ...eventForm, dateTime: e.target.value })}
                          required
                          className="w-full bg-white rounded-xl px-4 py-2.5 font-semibold border border-gray-200"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Venue / Zoom Link</label>
                        <input
                          value={eventForm.venue}
                          onChange={(e) => setEventForm({ ...eventForm, venue: e.target.value })}
                          placeholder="Auditorium / Zoom URL"
                          className="w-full bg-white rounded-xl px-4 py-2.5 font-semibold border border-gray-200"
                        />
                      </div>
                      {eventFeedback && (
                        <p className={`text-xs font-bold ${eventFeedback.includes("success") ? "text-emerald-600" : "text-red-600"}`}>
                          {eventFeedback}
                        </p>
                      )}
                      <button
                        type="submit"
                        disabled={creatingEvent}
                        className="w-full bg-saffron text-navy font-bold py-3 rounded-xl hover:bg-saffron/90 transition-all shadow-xs disabled:opacity-50"
                      >
                        {creatingEvent ? "Publishing..." : "Schedule Program"}
                      </button>
                    </form>
                  </div>

                  {/* Events List */}
                  <div>
                    <h3 className="text-sm font-extrabold text-navy mb-3">Scheduled Programs ({events.length})</h3>
                    {events.length === 0 ? (
                      <p className="text-xs text-gray-500 italic">No programs scheduled yet.</p>
                    ) : (
                      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                        {events.map((ev) => (
                          <div key={ev.id} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs space-y-2">
                            <div className="flex justify-between items-start">
                              <h4 className="font-bold text-navy text-sm">{ev.title}</h4>
                              <button
                                onClick={() => handleDeleteEvent(ev.id)}
                                className="text-xs font-bold text-red-600 hover:underline"
                              >
                                Delete
                              </button>
                            </div>
                            <p className="text-[11px] text-gray-500">📅 {new Date(ev.dateTime).toLocaleString()}</p>
                            {ev.venue && <p className="text-[11px] text-gray-600">📍 {ev.venue}</p>}
                            <button
                              onClick={() => handleViewAttendees(ev)}
                              className="text-xs font-bold text-saffron hover:underline inline-block"
                            >
                              View Attendees →
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: ADMIN TEAM MANAGEMENT */}
            {activeTab === "team" && (
              <div className="space-y-6">
                <div className="border-b border-gray-100 pb-3">
                  <h2 className="text-xl font-extrabold tracking-tight text-navy">Admin Team Management</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Manage coordinator and volunteer administrator accounts.</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Add Admin Form */}
                  <div className="bg-gray-50/80 rounded-2xl p-5 border border-gray-100 space-y-3 text-xs sm:text-sm">
                    <h3 className="text-sm font-extrabold text-navy">Add New Admin</h3>
                    <form onSubmit={handleAddAdmin} className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Name *</label>
                        <input
                          value={adminForm.name}
                          onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })}
                          placeholder="Full Name"
                          required
                          className="w-full bg-white rounded-xl px-4 py-2.5 font-semibold border border-gray-200"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Email *</label>
                        <input
                          type="email"
                          value={adminForm.email}
                          onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                          placeholder="admin@example.com"
                          required
                          className="w-full bg-white rounded-xl px-4 py-2.5 font-semibold border border-gray-200"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Password *</label>
                        <input
                          type="password"
                          value={adminForm.password}
                          onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
                          placeholder="Set Password"
                          required
                          className="w-full bg-white rounded-xl px-4 py-2.5 font-semibold border border-gray-200"
                        />
                      </div>
                      {adminFeedback && (
                        <p className={`text-xs font-bold ${adminFeedback.includes("successfully") ? "text-emerald-600" : "text-red-600"}`}>
                          {adminFeedback}
                        </p>
                      )}
                      <button
                        type="submit"
                        disabled={addingAdmin}
                        className="w-full bg-saffron text-navy font-bold py-3 rounded-xl hover:bg-saffron/90 transition-all shadow-xs disabled:opacity-50"
                      >
                        {addingAdmin ? "Creating..." : "Create Admin Account"}
                      </button>
                    </form>
                  </div>

                  {/* List of Admin Accounts */}
                  <div>
                    <h3 className="text-sm font-extrabold text-navy mb-3">Admin Team ({adminTeam.length})</h3>
                    <div className="space-y-2.5">
                      {adminTeam.map((adm) => (
                        <div key={adm.id} className="bg-gray-50/80 rounded-xl p-3.5 border border-gray-100 flex justify-between items-center text-xs">
                          <div>
                            <h4 className="font-bold text-navy">{adm.name}</h4>
                            <p className="text-[11px] text-gray-500">{adm.email}</p>
                            <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-saffron bg-saffron/10 px-2 py-0.5 mt-1 rounded">
                              {adm.role}
                            </span>
                          </div>
                          <button
                            onClick={() => handleDeleteAdmin(adm.id, adm.name)}
                            className="text-xs font-bold text-red-600 hover:bg-red-50 px-2.5 py-1 rounded-lg border border-red-200"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: ADMIN PROFILE INFO */}
            {activeTab === "profile" && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 space-y-6">
                <h2 className="text-xl font-extrabold tracking-tight text-navy border-b border-gray-100 pb-3">Admin Account Details</h2>
                <div className="grid sm:grid-cols-2 gap-6 text-xs sm:text-sm">
                  <div className="space-y-4">
                    <div>
                      <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Administrator Name</p>
                      <p className="font-bold text-navy text-base">{profileForm.name}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Email Address</p>
                      <p className="font-semibold text-gray-800">{profileForm.email}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Assigned Role</p>
                      <p className="font-bold text-saffron">{profileForm.role}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Access Rights</p>
                      <p className="font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 inline-block">
                        ✓ Full Administrative Access
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

    </div>
  );
}
