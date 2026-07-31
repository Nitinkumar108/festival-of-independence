import { useEffect, useState } from "react";
import api from "../api/axios.js";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("students"); // 'students', 'colleges', 'notifications', 'events', 'team'

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

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-navy">Admin Dashboard</h1>
          <p className="text-sm text-gray-600">Manage students, broadcast notifications, events, colleges, and admin team</p>
        </div>
        {activeTab === "students" && (
          <button
            onClick={handleExport}
            className="bg-navy text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 self-start sm:self-auto shadow-xs"
          >
            Export to Excel
          </button>
        )}
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-gray-200 mb-8 space-x-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab("students")}
          className={`pb-3 font-semibold text-sm transition-all border-b-2 whitespace-nowrap ${
            activeTab === "students"
              ? "border-navy text-navy"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Student Registrations
        </button>
        <button
          onClick={() => setActiveTab("colleges")}
          className={`pb-3 font-semibold text-sm transition-all border-b-2 whitespace-nowrap ${
            activeTab === "colleges"
              ? "border-navy text-navy"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          🏫 Colleges & Institutions
        </button>
        <button
          onClick={() => setActiveTab("notifications")}
          className={`pb-3 font-semibold text-sm transition-all border-b-2 whitespace-nowrap ${
            activeTab === "notifications"
              ? "border-navy text-navy"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          📢 Broadcast Notifications
        </button>
        <button
          onClick={() => setActiveTab("events")}
          className={`pb-3 font-semibold text-sm transition-all border-b-2 whitespace-nowrap ${
            activeTab === "events"
              ? "border-navy text-navy"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          📅 Manage Events & Programs
        </button>
        <button
          onClick={() => setActiveTab("team")}
          className={`pb-3 font-semibold text-sm transition-all border-b-2 whitespace-nowrap ${
            activeTab === "team"
              ? "border-navy text-navy"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          👥 Admin Team
        </button>
      </div>

      {/* TAB 1: Student Registrations */}
      {activeTab === "students" && (
        <div>
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchStudents()}
              placeholder="Search by name, email, or phone"
              className="flex-1 border rounded-lg px-4 py-2.5"
            />
            <select
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              className="border rounded-lg px-4 py-2.5 bg-white"
            >
              <option value="">All Payment Statuses</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>
            <button
              onClick={fetchStudents}
              className="bg-gray-100 border rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-gray-200"
            >
              Search
            </button>
          </div>

          <div className="overflow-x-auto border rounded-xl shadow-xs">
            <table className="w-full text-sm">
              <thead className="bg-navy text-white">
                <tr>
                  <th className="text-left px-4 py-3">Name</th>
                  <th className="text-left px-4 py-3">Email</th>
                  <th className="text-left px-4 py-3">College</th>
                  <th className="text-left px-4 py-3">Phone</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-left px-4 py-3">Registered</th>
                  <th className="text-right px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {loadingStudents && (
                  <tr>
                    <td colSpan={7} className="text-center py-6 text-gray-500">
                      Loading…
                    </td>
                  </tr>
                )}
                {!loadingStudents && students.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-6 text-gray-500">
                      No registrations found.
                    </td>
                  </tr>
                )}
                {students.map((s, i) => (
                  <tr key={s.id} className={i % 2 === 1 ? "bg-cream/40" : ""}>
                    <td className="px-4 py-3 font-medium">{s.fullName}</td>
                    <td className="px-4 py-3">{s.email}</td>
                    <td className="px-4 py-3">{s.College?.name || "—"}</td>
                    <td className="px-4 py-3">{s.phoneNumber}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          s.paymentStatus === "Paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {s.paymentStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(s.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleDeleteStudent(s.id, s.fullName)}
                        className="text-xs font-semibold text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md border border-red-200 transition-colors"
                      >
                        Delete Account
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Manage Colleges & Institutions */}
      {activeTab === "colleges" && (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Add College Form */}
          <div className="border rounded-xl p-6 bg-white shadow-xs">
            <h2 className="text-lg font-bold text-navy mb-4">Add New College / Institution</h2>
            <form onSubmit={handleAddCollege} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  College / Institution Name *
                </label>
                <input
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  placeholder="e.g., St. Xavier's College, Kolkata"
                  required
                  className="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  City / Location (Optional)
                </label>
                <input
                  value={collegeCity}
                  onChange={(e) => setCollegeCity(e.target.value)}
                  placeholder="e.g., Kolkata"
                  className="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
                />
              </div>

              {collegeFeedback && (
                <p className={`text-xs font-medium ${collegeFeedback.includes("successfully") ? "text-emerald-600" : "text-red-600"}`}>
                  {collegeFeedback}
                </p>
              )}

              <button
                type="submit"
                disabled={addingCollege}
                className="w-full bg-saffron text-navy font-bold py-3 rounded-lg hover:opacity-90 shadow-xs disabled:opacity-50"
              >
                {addingCollege ? "Adding..." : "Add College to Registration Form"}
              </button>
            </form>
          </div>

          {/* List of Colleges */}
          <div>
            <h2 className="text-lg font-bold text-navy mb-4">Registered Colleges ({colleges.length})</h2>
            {colleges.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No colleges added yet.</p>
            ) : (
              <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
                {colleges.map((c) => (
                  <div key={c.id} className="border rounded-lg p-3 bg-white shadow-xs flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-navy text-sm">{c.name}</p>
                      {c.city && <p className="text-xs text-gray-500">📍 {c.city}</p>}
                    </div>
                    <button
                      onClick={() => handleDeleteCollege(c.id)}
                      className="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: Broadcast Notifications */}
      {activeTab === "notifications" && (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Create Broadcast Form */}
          <div className="border rounded-xl p-6 bg-white shadow-xs">
            <h2 className="text-lg font-bold text-navy mb-4">Send Common Notification to Students</h2>
            <form onSubmit={handleSendNotification} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Notification Title
                </label>
                <input
                  value={notifTitle}
                  onChange={(e) => setNotifTitle(e.target.value)}
                  placeholder="e.g., Session Timing Change / Special Workshop"
                  required
                  className="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Message / Announcement
                </label>
                <textarea
                  value={notifMessage}
                  onChange={(e) => setNotifMessage(e.target.value)}
                  placeholder="Write your broadcast message here..."
                  rows={5}
                  required
                  className="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
                />
              </div>

              {notifFeedback && (
                <p className={`text-xs font-medium ${notifFeedback.includes("success") ? "text-emerald-600" : "text-red-600"}`}>
                  {notifFeedback}
                </p>
              )}

              <button
                type="submit"
                disabled={sendingNotif}
                className="w-full bg-saffron text-navy font-bold py-3 rounded-lg hover:opacity-90 shadow-xs disabled:opacity-50"
              >
                {sendingNotif ? "Broadcasting..." : "Broadcast Notification to All Students"}
              </button>
            </form>
          </div>

          {/* Past Sent Notifications */}
          <div>
            <h2 className="text-lg font-bold text-navy mb-4">Broadcast History</h2>
            {notifications.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No broadcast notifications sent yet.</p>
            ) : (
              <div className="space-y-3">
                {notifications.map((n) => (
                  <div key={n.id} className="border rounded-xl p-4 bg-white shadow-xs relative group">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-navy pr-6">{n.title}</h3>
                      <button
                        onClick={() => handleDeleteNotification(n.id)}
                        className="text-xs text-red-500 hover:text-red-700 font-medium"
                      >
                        Delete
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 mb-2">{new Date(n.createdAt).toLocaleString()}</p>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{n.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: Event & Program Scheduling */}
      {activeTab === "events" && (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Schedule Program Form */}
          <div className="border rounded-xl p-6 bg-white shadow-xs">
            <h2 className="text-lg font-bold text-navy mb-4">Schedule New Program / Event</h2>
            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Program Title *
                </label>
                <input
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  placeholder="Program Title"
                  required
                  className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Poster Image URL
                </label>
                <input
                  value={eventForm.posterUrl}
                  onChange={(e) => setEventForm({ ...eventForm, posterUrl: e.target.value })}
                  placeholder="https://example.com/poster.jpg"
                  className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                    Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    value={eventForm.dateTime}
                    onChange={(e) => setEventForm({ ...eventForm, dateTime: e.target.value })}
                    required
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                    Venue
                  </label>
                  <input
                    value={eventForm.venue}
                    onChange={(e) => setEventForm({ ...eventForm, venue: e.target.value })}
                    placeholder="e.g. Main Auditorium / Zoom"
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Joining Link (Optional)
                </label>
                <input
                  value={eventForm.joiningLink}
                  onChange={(e) => setEventForm({ ...eventForm, joiningLink: e.target.value })}
                  placeholder="https://zoom.us/j/..."
                  className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Description
                </label>
                <textarea
                  value={eventForm.description}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                  placeholder="Program agenda and description..."
                  rows={4}
                  className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
                />
              </div>

              {eventFeedback && (
                <p className={`text-xs font-medium ${eventFeedback.includes("success") ? "text-emerald-600" : "text-red-600"}`}>
                  {eventFeedback}
                </p>
              )}

              <button
                type="submit"
                disabled={creatingEvent}
                className="w-full bg-saffron text-navy font-bold py-3 rounded-lg hover:opacity-90 shadow-xs disabled:opacity-50"
              >
                {creatingEvent ? "Publishing..." : "Schedule Program"}
              </button>
            </form>
          </div>

          {/* List of Published Programs */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-navy">Scheduled Programs</h2>
            {events.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No programs scheduled yet.</p>
            ) : (
              events.map((ev) => (
                <div key={ev.id} className="border rounded-xl p-4 bg-white shadow-xs">
                  <div className="flex gap-4">
                    {ev.posterUrl && (
                      <img
                        src={ev.posterUrl}
                        alt={ev.title}
                        className="w-24 h-24 object-cover rounded-lg border flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-navy text-base truncate">{ev.title}</h3>
                        <button
                          onClick={() => handleDeleteEvent(ev.id)}
                          className="text-xs text-red-500 hover:text-red-700 font-medium ml-2"
                        >
                          Delete
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">📅 {new Date(ev.dateTime).toLocaleString()}</p>
                      {ev.venue && <p className="text-xs text-gray-600">📍 {ev.venue}</p>}
                      <p className="text-xs font-semibold text-emerald-700 mt-1">
                        Registered Students: {ev.registrationCount || 0}
                      </p>
                      <button
                        onClick={() => handleViewAttendees(ev)}
                        className="text-xs font-bold text-navy hover:underline mt-2 inline-block"
                      >
                        View Registered Attendees →
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Modal / Card for Attendees */}
            {selectedEventAttendees && (
              <div className="border border-navy/20 rounded-xl p-5 bg-navy/5 shadow-md">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-navy">
                    Attendees: {selectedEventAttendees.title}
                  </h3>
                  <button
                    onClick={() => setSelectedEventAttendees(null)}
                    className="text-xs font-bold text-gray-500 hover:text-navy"
                  >
                    Close ✕
                  </button>
                </div>
                {loadingAttendees ? (
                  <p className="text-xs text-gray-500">Loading attendees...</p>
                ) : attendeesList.length === 0 ? (
                  <p className="text-xs text-gray-500">No students registered for this event yet.</p>
                ) : (
                  <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                    {attendeesList.map((att, idx) => (
                      <div key={idx} className="bg-white p-2.5 rounded-lg border text-xs flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-navy">{att.student?.fullName}</p>
                          <p className="text-gray-500">{att.student?.email} • {att.student?.phoneNumber}</p>
                        </div>
                        <span className="text-gray-400 text-[10px]">
                          {new Date(att.registeredAt).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 5: Admin Team Management */}
      {activeTab === "team" && (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Add Admin Form */}
          <div className="border rounded-xl p-6 bg-white shadow-xs">
            <h2 className="text-lg font-bold text-navy mb-4">Add New Admin Account</h2>
            <form onSubmit={handleAddAdmin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Admin Name *
                </label>
                <input
                  value={adminForm.name}
                  onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })}
                  placeholder="Full Name"
                  required
                  className="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={adminForm.email}
                  onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                  placeholder="admin@example.com"
                  required
                  className="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Password *
                </label>
                <input
                  type="password"
                  value={adminForm.password}
                  onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
                  placeholder="Set Password"
                  required
                  className="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Admin Role
                </label>
                <select
                  value={adminForm.role}
                  onChange={(e) => setAdminForm({ ...adminForm, role: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2.5 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
                >
                  <option value="SuperAdmin">SuperAdmin</option>
                  <option value="VolunteerAdmin">VolunteerAdmin</option>
                </select>
              </div>

              {adminFeedback && (
                <p className={`text-xs font-medium ${adminFeedback.includes("successfully") ? "text-emerald-600" : "text-red-600"}`}>
                  {adminFeedback}
                </p>
              )}

              <button
                type="submit"
                disabled={addingAdmin}
                className="w-full bg-saffron text-navy font-bold py-3 rounded-lg hover:opacity-90 shadow-xs disabled:opacity-50"
              >
                {addingAdmin ? "Creating..." : "Create Admin Account"}
              </button>
            </form>
          </div>

          {/* List of Admin Accounts */}
          <div>
            <h2 className="text-lg font-bold text-navy mb-4">Admin Team ({adminTeam.length})</h2>
            {adminTeam.length === 0 ? (
              <p className="text-sm text-gray-500 italic">Loading admin team...</p>
            ) : (
              <div className="space-y-3">
                {adminTeam.map((adm) => (
                  <div key={adm.id} className="border rounded-xl p-4 bg-white shadow-xs flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-navy text-sm">{adm.name}</h3>
                      <p className="text-xs text-gray-500">{adm.email}</p>
                      <span className="inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 mt-1 rounded bg-navy/10 text-navy">
                        {adm.role}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteAdmin(adm.id, adm.name)}
                      className="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1 border border-red-200 rounded hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
