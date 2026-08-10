import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  Building2,
  Megaphone,
  Calendar,
  MessageSquareQuote,
  Mail,
  Users,
  UserCheck,
  LogOut,
  RefreshCw,
  Download,
  Plus,
  Trash2,
  Edit3,
  Search,
  Star,
  Upload,
  ShieldCheck,
  CheckCircle2,
  X,
  FileSpreadsheet,
  CalendarDays,
  User,
} from "lucide-react";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("students"); // 'students', 'colleges', 'notifications', 'events', 'team', 'profile'

  // Students state & filters
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCollege, setSelectedCollege] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
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

  // Super Admin Privilege Check
  const isSuperAdmin = user?.role === "SuperAdmin" || user?.adminRole === "SuperAdmin";

  // Testimonials state
  const [testimonials, setTestimonials] = useState([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState(false);
  const [testimonialForm, setTestimonialForm] = useState({
    name: "",
    designation: "",
    company: "",
    headline: "",
    quote: "",
    image: "",
    rating: 5,
  });
  const [addingTestimonial, setAddingTestimonial] = useState(false);
  const [testimonialFeedback, setTestimonialFeedback] = useState("");
  const [editingTestimonial, setEditingTestimonial] = useState(null);

  // Admin Team state
  const [adminTeam, setAdminTeam] = useState([]);
  const [adminForm, setAdminForm] = useState({ name: "", email: "", password: "", role: "VolunteerAdmin" });
  const [addingAdmin, setAddingAdmin] = useState(false);
  const [adminFeedback, setAdminFeedback] = useState("");

  // Edit Admin state (Super Admin only)
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [editAdminForm, setEditAdminForm] = useState({ name: "", email: "", role: "VolunteerAdmin", password: "" });
  const [savingEditAdmin, setSavingEditAdmin] = useState(false);
  const [editAdminFeedback, setEditAdminFeedback] = useState("");

  // Admin Profile Form State
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "IYF Kolkata Admin",
    email: user?.email || "nitin.231218@gmail.com",
    role: user?.role || user?.adminRole || "SuperAdmin",
  });

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || "Admin",
        email: user.email || "",
        role: user.role || user.adminRole || "VolunteerAdmin",
      });
    }
  }, [user]);

  // Contact Messages Inbox state
  const [contactMessages, setContactMessages] = useState([]);
  const [loadingContactMsgs, setLoadingContactMsgs] = useState(false);

  useEffect(() => {
    fetchColleges();
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (activeTab === "students") fetchStudents();
    if (activeTab === "notifications") fetchNotifications();
    if (activeTab === "events") fetchEvents();
    if (activeTab === "colleges") fetchColleges();
    if (activeTab === "testimonials") fetchTestimonials();
    if (activeTab === "team") fetchAdminTeam();
    if (activeTab === "messages") fetchContactMessages();
  }, [activeTab, paymentStatus, selectedCollege, selectedDate]);

  async function fetchTestimonials() {
    setLoadingTestimonials(true);
    try {
      const res = await api.get("/testimonials");
      setTestimonials(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingTestimonials(false);
    }
  }

  function countWords(str) {
    if (!str) return 0;
    return str.trim().split(/\s+/).filter(Boolean).length;
  }

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setTestimonialFeedback("Image size must be less than 5MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setTestimonialForm((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  }

  async function handleAddTestimonial(e) {
    e.preventDefault();
    if (!testimonialForm.name.trim() || !testimonialForm.designation.trim() || !testimonialForm.quote.trim()) {
      setTestimonialFeedback("Name, designation, and quote are required.");
      return;
    }
    const words = countWords(testimonialForm.quote);
    if (words > 50) {
      setTestimonialFeedback(`Quote cannot exceed 50 words (currently ${words} words).`);
      return;
    }

    setAddingTestimonial(true);
    setTestimonialFeedback("");
    try {
      if (editingTestimonial) {
        await api.put(`/testimonials/${editingTestimonial.id}`, testimonialForm);
        setTestimonialFeedback("Testimonial updated successfully!");
        setEditingTestimonial(null);
      } else {
        await api.post("/testimonials", testimonialForm);
        setTestimonialFeedback("Testimonial published successfully! It will now appear on the home page.");
      }
      setTestimonialForm({
        name: "",
        designation: "",
        company: "",
        headline: "",
        quote: "",
        image: "",
        rating: 5,
      });
      fetchTestimonials();
    } catch (err) {
      setTestimonialFeedback(err.response?.data?.message || "Failed to save testimonial.");
    } finally {
      setAddingTestimonial(false);
    }
  }

  function handleStartEditTestimonial(item) {
    setEditingTestimonial(item);
    setTestimonialForm({
      name: item.name || "",
      designation: item.designation || "",
      company: item.company || "",
      headline: item.headline || "",
      quote: item.quote || "",
      image: item.image || "",
      rating: item.rating || 5,
    });
    setTestimonialFeedback("");
  }

  function handleCancelEditTestimonial() {
    setEditingTestimonial(null);
    setTestimonialForm({
      name: "",
      designation: "",
      company: "",
      headline: "",
      quote: "",
      image: "",
      rating: 5,
    });
    setTestimonialFeedback("");
  }

  async function handleDeleteTestimonial(id, name) {
    if (!confirm(`Are you sure you want to delete the testimonial for "${name}"?`)) return;
    try {
      await api.delete(`/testimonials/${id}`);
      toast.success("Testimonial deleted successfully.");
      fetchTestimonials();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete testimonial.");
    }
  }

  async function fetchContactMessages() {
    setLoadingContactMsgs(true);
    try {
      const res = await api.get("/contact");
      setContactMessages(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingContactMsgs(false);
    }
  }

  async function fetchStudents() {
    setLoadingStudents(true);
    try {
      const res = await api.get("/admin/students", {
        params: {
          search: search || undefined,
          paymentStatus: paymentStatus || undefined,
          college: selectedCollege || undefined,
          date: selectedDate || undefined,
        },
      });
      setStudents(res.data);
    } finally {
      setLoadingStudents(false);
    }
  }

  async function handleDeleteStudent(id, name) {
    if (!isSuperAdmin) {
      toast.error("Only Super Admins have permission to delete student accounts.");
      return;
    }
    if (!confirm(`Are you sure you want to delete the student account for "${name}"?`)) return;
    try {
      await api.delete(`/admin/students/${id}`);
      toast.success("Student account removed.");
      fetchStudents();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete student account.");
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
    try {
      toast.info("Generating Excel sheet...");
      const res = await api.get("/admin/students/export", {
        params: {
          search: search || undefined,
          paymentStatus: paymentStatus || undefined,
          college: selectedCollege || undefined,
          date: selectedDate || undefined,
        },
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "students-registrations.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("Registrations Excel exported successfully!");
    } catch (err) {
      toast.error("Failed to export students list.");
    }
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
      toast.success("Broadcast notification sent to all registered students!");
      setNotifFeedback("Notification broadcasted successfully!");
      fetchNotifications();
    } catch (err) {
      toast.error("Failed to send notification.");
      setNotifFeedback("Failed to send notification.");
    } finally {
      setSendingNotif(false);
    }
  }

  async function handleDeleteNotification(id) {
    if (!confirm("Delete this notification?")) return;
    try {
      await api.delete(`/admin/notifications/${id}`);
      toast.success("Notification deleted.");
      fetchNotifications();
    } catch (err) {
      toast.error("Failed to delete notification.");
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
      toast.success("Program scheduled successfully!");
      setEventFeedback("Program scheduled successfully!");
      fetchEvents();
    } catch (err) {
      toast.error("Failed to schedule program.");
      setEventFeedback("Failed to schedule program.");
    } finally {
      setCreatingEvent(false);
    }
  }

  async function handleDeleteEvent(id) {
    if (!confirm("Delete this program/event?")) return;
    try {
      await api.delete(`/events/${id}`);
      toast.success("Event deleted.");
      fetchEvents();
    } catch (err) {
      toast.error("Failed to delete event.");
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
      toast.success("College added successfully! Live in registration dropdown.");
      setCollegeFeedback("College added successfully! It will now appear in registration form.");
      fetchColleges();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add college.");
      setCollegeFeedback(err.response?.data?.message || "Failed to add college.");
    } finally {
      setAddingCollege(false);
    }
  }

  async function handleDeleteCollege(id) {
    if (!confirm("Delete this college?")) return;
    try {
      await api.delete(`/colleges/${id}`);
      toast.success("College removed.");
      fetchColleges();
    } catch (err) {
      toast.error("Failed to delete college.");
    }
  }

  async function handleAddAdmin(e) {
    e.preventDefault();
    if (!isSuperAdmin) {
      toast.error("Only Super Admins can create new admin accounts.");
      return;
    }
    if (!adminForm.name || !adminForm.email || !adminForm.password) return;
    setAddingAdmin(true);
    setAdminFeedback("");
    try {
      await api.post("/admin/team", adminForm);
      setAdminForm({ name: "", email: "", password: "", role: "VolunteerAdmin" });
      toast.success("New admin account created successfully!");
      setAdminFeedback("New admin account created successfully!");
      fetchAdminTeam();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create admin account.");
      setAdminFeedback(err.response?.data?.message || "Failed to create admin account.");
    } finally {
      setAddingAdmin(false);
    }
  }

  function handleStartEditAdmin(adm) {
    setEditingAdmin(adm);
    setEditAdminForm({
      name: adm.name || "",
      email: adm.email || "",
      role: adm.role || "VolunteerAdmin",
      password: "",
    });
    setEditAdminFeedback("");
  }

  function handleCancelEditAdmin() {
    setEditingAdmin(null);
    setEditAdminFeedback("");
  }

  async function handleSaveEditAdmin(e) {
    e.preventDefault();
    if (!isSuperAdmin) {
      toast.error("Only Super Admins can modify admin details.");
      return;
    }
    if (!editAdminForm.name || !editAdminForm.email) return;
    setSavingEditAdmin(true);
    setEditAdminFeedback("");
    try {
      const payload = {
        name: editAdminForm.name,
        email: editAdminForm.email,
        role: editAdminForm.role,
      };
      if (editAdminForm.password && editAdminForm.password.trim().length > 0) {
        payload.password = editAdminForm.password;
      }
      await api.put(`/admin/team/${editingAdmin.id}`, payload);
      toast.success("Admin details updated successfully!");
      setEditAdminFeedback("Admin details updated successfully!");
      fetchAdminTeam();
      setTimeout(() => {
        setEditingAdmin(null);
        setEditAdminFeedback("");
      }, 1200);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update admin details.");
      setEditAdminFeedback(err.response?.data?.message || "Failed to update admin details.");
    } finally {
      setSavingEditAdmin(false);
    }
  }

  async function handleDeleteAdmin(id, name) {
    if (!isSuperAdmin) {
      toast.error("Only Super Admins can remove admin accounts.");
      return;
    }
    if (!confirm(`Remove admin account for "${name}"?`)) return;
    try {
      await api.delete(`/admin/team/${id}`);
      toast.success("Admin account removed.");
      fetchAdminTeam();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete admin account.");
    }
  }

  function handleLogoutClick() {
    logout();
    navigate("/");
  }

  return (
    <div className="w-full flex-1 flex flex-col bg-[#F4F4F8] py-3 sm:py-5 px-3 sm:px-6 font-sans">
      
      {/* Master Card Dashboard Container */}
      <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col bg-white rounded-[28px] sm:rounded-[34px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)] border border-gray-100/90 overflow-hidden my-auto">
        <div className="grid md:grid-cols-12 flex-1 w-full items-stretch">
          
          {/* Left Column: Admin Profile Sidebar Nav (md:col-span-4 lg:col-span-3) */}
          <div className="md:col-span-4 lg:col-span-3 bg-slate-50/90 border-r border-gray-100 p-5 sm:p-6 flex flex-col justify-between h-full">
            <div className="space-y-6">
              
              {/* Admin Avatar & Header Info */}
              <div className="flex flex-col items-center text-center pt-2">
                <div className="relative mb-3.5 group">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#FFB877] via-[#FF8432] to-[#311D4E] text-white flex items-center justify-center font-extrabold text-2xl sm:text-3xl shadow-md ring-4 ring-white">
                    {profileForm.name?.charAt(0).toUpperCase() || "A"}
                  </div>
                  <button
                    aria-label="Edit Profile Avatar"
                    className="absolute bottom-0.5 right-1 w-7 h-7 bg-saffron text-navy rounded-full flex items-center justify-center text-xs shadow-md hover:scale-110 transition-transform ring-2 ring-white"
                  >
                    ✏️
                  </button>
                </div>

                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-navy mb-0.5">{profileForm.name}</h2>
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
                  className={`w-full flex items-center justify-between px-4 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                    activeTab === "students"
                      ? "bg-amber-100/70 text-saffron shadow-2xs"
                      : "text-gray-600 hover:bg-gray-100/80"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <GraduationCap className="w-4 h-4 text-saffron" /> Student Registrations
                  </span>
                  {students.length > 0 && (
                    <span className="text-[10px] font-extrabold bg-white text-navy px-2 py-0.5 rounded-full border border-gray-200">
                      {students.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab("colleges")}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                    activeTab === "colleges"
                      ? "bg-amber-100/70 text-saffron shadow-2xs"
                      : "text-gray-600 hover:bg-gray-100/80"
                  }`}
                >
                  <Building2 className="w-4 h-4 text-saffron" /> Colleges & Institutions
                </button>

                <button
                  onClick={() => setActiveTab("notifications")}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                    activeTab === "notifications"
                      ? "bg-amber-100/70 text-saffron shadow-2xs"
                      : "text-gray-600 hover:bg-gray-100/80"
                  }`}
                >
                  <Megaphone className="w-4 h-4 text-saffron" /> Broadcast Notifications
                </button>

                <button
                  onClick={() => setActiveTab("events")}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                    activeTab === "events"
                      ? "bg-amber-100/70 text-saffron shadow-2xs"
                      : "text-gray-600 hover:bg-gray-100/80"
                  }`}
                >
                  <CalendarDays className="w-4 h-4 text-saffron" /> Manage Events & Programs
                </button>

                <button
                  onClick={() => setActiveTab("testimonials")}
                  className={`w-full flex items-center justify-between px-4 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                    activeTab === "testimonials"
                      ? "bg-amber-100/70 text-saffron shadow-2xs"
                      : "text-gray-600 hover:bg-gray-100/80"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <MessageSquareQuote className="w-4 h-4 text-saffron" /> Testimonials
                  </span>
                  {testimonials.length > 0 && (
                    <span className="text-[10px] font-extrabold bg-white text-navy px-2 py-0.5 rounded-full border border-gray-200">
                      {testimonials.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab("messages")}
                  className={`w-full flex items-center justify-between px-4 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                    activeTab === "messages"
                      ? "bg-amber-100/70 text-saffron shadow-2xs"
                      : "text-gray-600 hover:bg-gray-100/80"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-saffron" /> Contact Inbox
                  </span>
                  {contactMessages.length > 0 && (
                    <span className="text-[10px] font-extrabold bg-saffron text-navy px-2 py-0.5 rounded-full">
                      {contactMessages.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab("team")}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                    activeTab === "team"
                      ? "bg-amber-100/70 text-saffron shadow-2xs"
                      : "text-gray-600 hover:bg-gray-100/80"
                  }`}
                >
                  <Users className="w-4 h-4 text-saffron" /> Admin Team Management
                </button>

                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                    activeTab === "profile"
                      ? "bg-amber-100/70 text-saffron shadow-2xs"
                      : "text-gray-600 hover:bg-gray-100/80"
                  }`}
                >
                  <User className="w-4 h-4 text-saffron" /> Admin Profile Info
                </button>
              </nav>

            </div>

            {/* Logout Action at Bottom */}
            <div className="pt-4 border-t border-gray-200/80 mt-4">
              <button
                onClick={handleLogoutClick}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4 text-red-500" /> Log Out
              </button>
            </div>

          </div>

          {/* Right Column: Active Tab Content (md:col-span-8 lg:col-span-9) */}
          <div className="md:col-span-8 lg:col-span-9 p-5 sm:p-8 lg:p-10 flex flex-col justify-between h-full overflow-y-auto">
            
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

                {/* Search & Filter Controls Panel */}
                <div className="bg-gray-50/90 p-4 rounded-2xl border border-gray-200/80 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                    {/* 1. Search Input */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                        🔍 Search
                      </label>
                      <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && fetchStudents()}
                        placeholder="Name, email, or phone"
                        className="w-full bg-white rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold border border-gray-200 focus:outline-none focus:border-saffron shadow-2xs"
                      />
                    </div>

                    {/* 2. College Filter Dropdown */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                        🏫 Filter by College
                      </label>
                      <select
                        value={selectedCollege}
                        onChange={(e) => setSelectedCollege(e.target.value)}
                        className="w-full bg-white rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold border border-gray-200 focus:outline-none focus:border-saffron shadow-2xs"
                      >
                        <option value="">All Colleges</option>
                        {[...colleges]
                          .sort((a, b) => {
                            const aName = (a.name || "").trim();
                            const bName = (b.name || "").trim();
                            const aOther = aName.toLowerCase().startsWith("other");
                            const bOther = bName.toLowerCase().startsWith("other");
                            if (aOther && !bOther) return 1;
                            if (!aOther && bOther) return -1;
                            return aName.localeCompare(bName, undefined, { sensitivity: "base" });
                          })
                          .map((c) => (
                            <option key={c.id} value={c.name}>
                              {c.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    {/* 3. Registration Date Filter */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                        📅 Filter by Date
                      </label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full bg-white rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold border border-gray-200 focus:outline-none focus:border-saffron shadow-2xs"
                      />
                    </div>

                    {/* 4. Payment / Status Filter */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                        💳 Status
                      </label>
                      <select
                        value={paymentStatus}
                        onChange={(e) => setPaymentStatus(e.target.value)}
                        className="w-full bg-white rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold border border-gray-200 focus:outline-none focus:border-saffron shadow-2xs"
                      >
                        <option value="">All Statuses</option>
                        <option value="Paid">✓ Confirmed / Paid</option>
                        <option value="Pending">⏳ Pending</option>
                      </select>
                    </div>
                  </div>

                  {/* Filter Action Toolbar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gray-200/60">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-extrabold text-navy">
                        Found {students.length} student{students.length !== 1 ? "s" : ""}
                      </span>
                      {(search || selectedCollege || selectedDate || paymentStatus) && (
                        <button
                          onClick={() => {
                            setSearch("");
                            setSelectedCollege("");
                            setSelectedDate("");
                            setPaymentStatus("");
                          }}
                          className="text-[11px] font-bold text-red-600 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-lg border border-red-200 transition-colors"
                        >
                          ✕ Clear Filters
                        </button>
                      )}
                    </div>

                    <button
                      onClick={fetchStudents}
                      className="bg-saffron text-navy text-xs font-bold px-4 py-1.5 rounded-xl hover:bg-indiagreen hover:text-white transition-all shadow-2xs"
                    >
                      Apply Filter
                    </button>
                  </div>
                </div>

                {/* Students Table */}
                <div className="overflow-x-auto border border-gray-100 rounded-2xl shadow-2xs">
                  <table className="w-full text-xs sm:text-sm">
                    <thead className="bg-navy text-white font-bold">
                      <tr>
                        <th className="text-left px-4 py-3">Name</th>
                        <th className="text-left px-4 py-3">Gender</th>
                        <th className="text-left px-4 py-3">College</th>
                        <th className="text-left px-4 py-3">Email</th>
                        <th className="text-left px-4 py-3">Phone</th>
                        <th className="text-left px-4 py-3">Reg. Date</th>
                        <th className="text-left px-4 py-3">Status</th>
                        {isSuperAdmin && <th className="text-right px-4 py-3">Action</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {loadingStudents && (
                        <tr>
                          <td colSpan={isSuperAdmin ? 8 : 7} className="text-center py-6 text-gray-500">
                            Loading students...
                          </td>
                        </tr>
                      )}
                      {!loadingStudents && students.length === 0 && (
                        <tr>
                          <td colSpan={isSuperAdmin ? 8 : 7} className="text-center py-6 text-gray-500">
                            No student registrations match the selected filters.
                          </td>
                        </tr>
                      )}
                      {students.map((s, i) => (
                        <tr key={s.id} className={i % 2 === 1 ? "bg-gray-50/50" : "bg-white"}>
                          <td className="px-4 py-3 font-bold text-navy">{s.fullName}</td>
                          <td className="px-4 py-3">
                            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                              s.gender === "Female"
                                ? "bg-pink-50 text-pink-700 border border-pink-200"
                                : s.gender === "Male"
                                ? "bg-blue-50 text-blue-700 border border-blue-200"
                                : "bg-gray-100 text-gray-600"
                            }`}>
                              {s.gender || "—"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-700 font-medium">{s.College?.name || "—"}</td>
                          <td className="px-4 py-3 text-gray-700">{s.email}</td>
                          <td className="px-4 py-3 text-gray-700">{s.phoneNumber}</td>
                          <td className="px-4 py-3 text-gray-500 text-[11px] whitespace-nowrap">
                            {s.createdAt ? new Date(s.createdAt).toLocaleDateString() : "—"}
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                              ✓ Confirmed (Free)
                            </span>
                          </td>
                          {isSuperAdmin && (
                            <td className="px-4 py-3 text-right">
                              <button
                                onClick={() => handleDeleteStudent(s.id, s.fullName)}
                                className="text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-xl border border-red-200 transition-colors"
                              >
                                Delete
                              </button>
                            </td>
                          )}
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
                <div className="border-b border-gray-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="text-xl font-extrabold tracking-tight text-navy">Admin Team Management</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Manage coordinator and volunteer administrator accounts.</p>
                  </div>
                  {isSuperAdmin ? (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full self-start sm:self-auto">
                      ✓ Super Admin Access
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full self-start sm:self-auto">
                      🔒 View Only Mode
                    </span>
                  )}
                </div>

                {!isSuperAdmin && (
                  <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-4 flex items-start sm:items-center gap-3 text-xs text-amber-950 font-medium">
                    <span className="text-xl">🛡️</span>
                    <div>
                      <p className="font-bold text-navy">Super Admin Permission Required</p>
                      <p className="text-gray-600 mt-0.5">
                        Only Super Admins have the authority to add new admins, edit admin credentials, or remove team members.
                      </p>
                    </div>
                  </div>
                )}

                <div className={isSuperAdmin ? "grid lg:grid-cols-2 gap-6" : "space-y-4"}>
                  {/* Super Admin Action: Add or Edit Form */}
                  {isSuperAdmin && (
                    <div className="bg-gray-50/80 rounded-2xl p-5 border border-gray-100 space-y-4 text-xs sm:text-sm">
                      {editingAdmin ? (
                        // EDIT ADMIN FORM
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <h3 className="text-sm font-extrabold text-navy">✏️ Edit Admin Details</h3>
                            <button
                              type="button"
                              onClick={handleCancelEditAdmin}
                              className="text-xs text-gray-500 hover:text-navy font-bold underline"
                            >
                              Cancel
                            </button>
                          </div>
                          <form onSubmit={handleSaveEditAdmin} className="space-y-3">
                            <div>
                              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                                Full Name *
                              </label>
                              <input
                                value={editAdminForm.name}
                                onChange={(e) => setEditAdminForm({ ...editAdminForm, name: e.target.value })}
                                required
                                className="w-full bg-white rounded-xl px-4 py-2.5 font-semibold border border-gray-200 focus:outline-none focus:border-saffron"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                                Email Address *
                              </label>
                              <input
                                type="email"
                                value={editAdminForm.email}
                                onChange={(e) => setEditAdminForm({ ...editAdminForm, email: e.target.value })}
                                required
                                className="w-full bg-white rounded-xl px-4 py-2.5 font-semibold border border-gray-200 focus:outline-none focus:border-saffron"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                                Admin Role *
                              </label>
                              <select
                                value={editAdminForm.role}
                                onChange={(e) => setEditAdminForm({ ...editAdminForm, role: e.target.value })}
                                className="w-full bg-white rounded-xl px-4 py-2.5 font-semibold border border-gray-200 focus:outline-none focus:border-saffron"
                              >
                                <option value="VolunteerAdmin">VolunteerAdmin (Instant Password Login)</option>
                                <option value="SuperAdmin">SuperAdmin (Full Permissions + 2FA OTP)</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                                New Password (leave blank to keep current)
                              </label>
                              <input
                                type="password"
                                value={editAdminForm.password}
                                onChange={(e) => setEditAdminForm({ ...editAdminForm, password: e.target.value })}
                                placeholder="Enter new password to reset"
                                className="w-full bg-white rounded-xl px-4 py-2.5 font-semibold border border-gray-200 focus:outline-none focus:border-saffron"
                              />
                            </div>
                            {editAdminFeedback && (
                              <p className={`text-xs font-bold ${editAdminFeedback.includes("successfully") ? "text-emerald-600" : "text-red-600"}`}>
                                {editAdminFeedback}
                              </p>
                            )}
                            <div className="flex gap-2 pt-1">
                              <button
                                type="submit"
                                disabled={savingEditAdmin}
                                className="flex-1 bg-saffron text-navy font-bold py-2.5 rounded-xl hover:bg-indiagreen hover:text-white transition-all shadow-xs disabled:opacity-50"
                              >
                                {savingEditAdmin ? "Saving..." : "Save Changes"}
                              </button>
                              <button
                                type="button"
                                onClick={handleCancelEditAdmin}
                                className="px-4 bg-gray-200 text-gray-700 font-bold py-2.5 rounded-xl hover:bg-gray-300 transition-all"
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        </div>
                      ) : (
                        // ADD ADMIN FORM
                        <div className="space-y-3">
                          <h3 className="text-sm font-extrabold text-navy">➕ Add New Admin</h3>
                          <form onSubmit={handleAddAdmin} className="space-y-3">
                            <div>
                              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Name *</label>
                              <input
                                value={adminForm.name}
                                onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })}
                                placeholder="Full Name"
                                required
                                className="w-full bg-white rounded-xl px-4 py-2.5 font-semibold border border-gray-200 focus:outline-none focus:border-saffron"
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
                                className="w-full bg-white rounded-xl px-4 py-2.5 font-semibold border border-gray-200 focus:outline-none focus:border-saffron"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Role *</label>
                              <select
                                value={adminForm.role}
                                onChange={(e) => setAdminForm({ ...adminForm, role: e.target.value })}
                                className="w-full bg-white rounded-xl px-4 py-2.5 font-semibold border border-gray-200 focus:outline-none focus:border-saffron"
                              >
                                <option value="VolunteerAdmin">VolunteerAdmin (Password Only)</option>
                                <option value="SuperAdmin">SuperAdmin (Full Permissions + 2FA OTP)</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Password *</label>
                              <input
                                type="password"
                                value={adminForm.password}
                                onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
                                placeholder="Set Password"
                                required
                                className="w-full bg-white rounded-xl px-4 py-2.5 font-semibold border border-gray-200 focus:outline-none focus:border-saffron"
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
                              className="w-full bg-saffron text-navy font-bold py-3 rounded-xl hover:bg-indiagreen hover:text-white transition-all shadow-xs disabled:opacity-50"
                            >
                              {addingAdmin ? "Creating..." : "Create Admin Account"}
                            </button>
                          </form>
                        </div>
                      )}
                    </div>
                  )}

                  {/* List of Admin Accounts */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-extrabold text-navy">Admin Team Directory ({adminTeam.length})</h3>
                    <div className="space-y-2.5">
                      {adminTeam.map((adm) => (
                        <div key={adm.id} className="bg-gray-50/90 rounded-2xl p-4 border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-navy text-sm">{adm.name}</h4>
                              {adm.email === user?.email && (
                                <span className="text-[10px] font-extrabold bg-blue-100 text-blue-800 px-2 py-0.2 rounded-full">
                                  You
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-gray-500">{adm.email}</p>
                            <span className={`inline-block text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 mt-1.5 rounded-md ${
                              adm.role === "SuperAdmin"
                                ? "text-purple-700 bg-purple-100 border border-purple-200"
                                : "text-saffron bg-saffron/10 border border-saffron/20"
                            }`}>
                              🛡️ {adm.role}
                            </span>
                          </div>

                          {/* Super Admin Action Controls */}
                          {isSuperAdmin && (
                            <div className="flex items-center gap-2 self-end sm:self-center">
                              <button
                                onClick={() => handleStartEditAdmin(adm)}
                                className="text-xs font-bold text-navy bg-white hover:bg-gray-100 px-3 py-1.5 rounded-xl border border-gray-200 transition-colors shadow-2xs"
                              >
                                ✏️ Edit
                              </button>
                              {adm.id !== user?.id && (
                                <button
                                  onClick={() => handleDeleteAdmin(adm.id, adm.name)}
                                  className="text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-xl border border-red-200 transition-colors"
                                >
                                  🗑️ Remove
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: CONTACT INBOX MESSAGES */}
            {activeTab === "messages" && (
              <div className="space-y-6">
                <div className="border-b border-gray-100 pb-3 flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-extrabold tracking-tight text-navy">Contact Us Inbox</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Inquiries submitted by website visitors.</p>
                  </div>
                  <button
                    onClick={fetchContactMessages}
                    className="text-xs font-bold text-navy bg-gray-100 hover:bg-gray-200 px-3.5 py-2 rounded-xl transition-all"
                  >
                    🔄 Refresh Inbox
                  </button>
                </div>

                {loadingContactMsgs ? (
                  <p className="text-xs text-gray-500 italic">Loading messages...</p>
                ) : contactMessages.length === 0 ? (
                  <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <p className="text-sm font-bold text-gray-600">Inbox is empty</p>
                    <p className="text-xs text-gray-400 mt-1">No contact messages received yet.</p>
                  </div>
                ) : (
                  <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-1">
                    {contactMessages.map((msg) => (
                      <div key={msg.id} className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-2xs space-y-2.5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-gray-100 pb-2">
                          <div>
                            <h3 className="font-extrabold text-navy text-sm">{msg.name}</h3>
                            <p className="text-xs text-gray-500">
                              📧 <a href={`mailto:${msg.email}`} className="text-saffron hover:underline">{msg.email}</a>
                              {msg.phone && <span className="ml-3">📞 {msg.phone}</span>}
                            </p>
                          </div>
                          <span className="text-[10px] font-semibold text-gray-400">
                            {new Date(msg.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap bg-gray-50/60 p-3 rounded-xl border border-gray-100">
                          {msg.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: TESTIMONIALS MANAGEMENT */}
            {activeTab === "testimonials" && (
              <div className="space-y-6">
                <div className="border-b border-gray-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="text-xl font-extrabold tracking-tight text-navy">Manage Testimonials</h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Add, edit, and manage testimonials dynamically displayed on the Home page carousel.
                    </p>
                  </div>
                  <button
                    onClick={fetchTestimonials}
                    className="text-xs font-bold text-navy bg-gray-100 hover:bg-gray-200 px-3.5 py-2 rounded-xl transition-all self-start sm:self-auto"
                  >
                    🔄 Refresh
                  </button>
                </div>

                <div className="grid lg:grid-cols-12 gap-6">
                  {/* Left Column (5 Cols): Add / Edit Testimonial Form */}
                  <div className="lg:col-span-5 bg-gray-50/90 rounded-2xl p-5 border border-gray-200/80 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-extrabold text-navy">
                        {editingTestimonial ? "✏️ Edit Testimonial" : "➕ Add New Testimonial"}
                      </h3>
                      {editingTestimonial && (
                        <button
                          type="button"
                          onClick={handleCancelEditTestimonial}
                          className="text-xs text-gray-500 hover:text-navy font-bold underline"
                        >
                          Cancel
                        </button>
                      )}
                    </div>

                    <form onSubmit={handleAddTestimonial} className="space-y-3.5 text-xs sm:text-sm">
                      {/* Name */}
                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                          Person Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          value={testimonialForm.name}
                          onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                          placeholder="e.g. Rahul Sharma"
                          required
                          className="w-full bg-white rounded-xl px-3.5 py-2.5 font-semibold border border-gray-200 focus:outline-none focus:border-saffron"
                        />
                      </div>

                      {/* Designation */}
                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                          Designation <span className="text-red-500">*</span>
                        </label>
                        <input
                          value={testimonialForm.designation}
                          onChange={(e) => setTestimonialForm({ ...testimonialForm, designation: e.target.value })}
                          placeholder="e.g. Software Engineer / MBBS Student"
                          required
                          className="w-full bg-white rounded-xl px-3.5 py-2.5 font-semibold border border-gray-200 focus:outline-none focus:border-saffron"
                        />
                      </div>

                      {/* Company / College */}
                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                          Company / Institution
                        </label>
                        <input
                          value={testimonialForm.company}
                          onChange={(e) => setTestimonialForm({ ...testimonialForm, company: e.target.value })}
                          placeholder="e.g. Google / IIEST Shibpur / IPGMER"
                          className="w-full bg-white rounded-xl px-3.5 py-2.5 font-semibold border border-gray-200 focus:outline-none focus:border-saffron"
                        />
                      </div>

                      {/* Headline */}
                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                          Headline / Highlight
                        </label>
                        <input
                          value={testimonialForm.headline}
                          onChange={(e) => setTestimonialForm({ ...testimonialForm, headline: e.target.value })}
                          placeholder="e.g. LIFE TRANSFORMED FOR THE BETTER!"
                          className="w-full bg-white rounded-xl px-3.5 py-2.5 font-semibold border border-gray-200 focus:outline-none focus:border-saffron"
                        />
                      </div>

                      {/* Image Upload Option */}
                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                          Photo / Avatar
                        </label>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            {testimonialForm.image ? (
                              <div className="relative group">
                                <img
                                  src={testimonialForm.image}
                                  alt="Preview"
                                  className="w-14 h-14 rounded-full object-cover border-2 border-saffron shadow-sm"
                                />
                                <button
                                  type="button"
                                  onClick={() => setTestimonialForm((prev) => ({ ...prev, image: "" }))}
                                  className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-black"
                                >
                                  ✕
                                </button>
                              </div>
                            ) : (
                              <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-xl border border-gray-300">
                                👤
                              </div>
                            )}

                            <label className="flex-1 cursor-pointer bg-white hover:bg-gray-100 border border-gray-200 rounded-xl px-3.5 py-2.5 text-center font-bold text-navy text-xs transition-colors shadow-2xs">
                              <span>📁 Choose Photo</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                              />
                            </label>
                          </div>
                          <input
                            value={testimonialForm.image}
                            onChange={(e) => setTestimonialForm({ ...testimonialForm, image: e.target.value })}
                            placeholder="Or paste direct image URL (optional)"
                            className="w-full bg-white rounded-xl px-3.5 py-2 text-[11px] font-medium border border-gray-200 focus:outline-none focus:border-saffron text-gray-600"
                          />
                        </div>
                      </div>

                      {/* Testimonial Quote with 50 Word Limit Indicator */}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider">
                            Testimonial Quote <span className="text-red-500">*</span>
                          </label>
                          <span
                            className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                              countWords(testimonialForm.quote) > 50
                                ? "bg-red-100 text-red-700 font-extrabold animate-pulse"
                                : countWords(testimonialForm.quote) > 40
                                ? "bg-amber-100 text-amber-800"
                                : "bg-emerald-50 text-emerald-700"
                            }`}
                          >
                            {countWords(testimonialForm.quote)} / 50 words
                          </span>
                        </div>
                        <textarea
                          rows={3}
                          value={testimonialForm.quote}
                          onChange={(e) => setTestimonialForm({ ...testimonialForm, quote: e.target.value })}
                          placeholder="Share the impact, learning, or experience (maximum 50 words)..."
                          required
                          className={`w-full bg-white rounded-xl px-3.5 py-2.5 font-semibold border ${
                            countWords(testimonialForm.quote) > 50
                              ? "border-red-500 focus:border-red-500"
                              : "border-gray-200 focus:border-saffron"
                          } focus:outline-none`}
                        />
                        {countWords(testimonialForm.quote) > 50 && (
                          <p className="text-[11px] text-red-600 font-bold mt-1">
                            ⚠️ Limit exceeded! Please shorten by {countWords(testimonialForm.quote) - 50} word{countWords(testimonialForm.quote) - 50 !== 1 ? "s" : ""}.
                          </p>
                        )}
                      </div>

                      {/* Rating Selector */}
                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                          Star Rating
                        </label>
                        <select
                          value={testimonialForm.rating}
                          onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: parseInt(e.target.value) })}
                          className="w-full bg-white rounded-xl px-3.5 py-2 font-semibold border border-gray-200 focus:outline-none focus:border-saffron"
                        >
                          <option value={5}>★★★★★ (5 Stars)</option>
                          <option value={4}>★★★★☆ (4 Stars)</option>
                          <option value={3}>★★★☆☆ (3 Stars)</option>
                        </select>
                      </div>

                      {testimonialFeedback && (
                        <p
                          className={`text-xs font-bold p-2.5 rounded-xl ${
                            testimonialFeedback.includes("success")
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-red-50 text-red-600 border border-red-200"
                          }`}
                        >
                          {testimonialFeedback}
                        </p>
                      )}

                      <div className="flex gap-2 pt-1">
                        <button
                          type="submit"
                          disabled={addingTestimonial || countWords(testimonialForm.quote) > 50}
                          className="flex-1 bg-saffron text-navy font-bold py-3 rounded-xl hover:bg-indiagreen hover:text-white transition-all shadow-xs disabled:opacity-50"
                        >
                          {addingTestimonial
                            ? "Saving..."
                            : editingTestimonial
                            ? "Save Changes"
                            : "Publish Testimonial"}
                        </button>
                        {editingTestimonial && (
                          <button
                            type="button"
                            onClick={handleCancelEditTestimonial}
                            className="px-4 bg-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-300 transition-all"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </form>
                  </div>

                  {/* Right Column (7 Cols): Live Testimonials Directory */}
                  <div className="lg:col-span-7 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-extrabold text-navy">
                        Live Testimonials Directory ({testimonials.length})
                      </h3>
                      <span className="text-[11px] font-bold text-gray-400">
                        Displays in Home Page Slider
                      </span>
                    </div>

                    {loadingTestimonials ? (
                      <p className="text-xs text-gray-500 italic py-6 text-center">Loading testimonials...</p>
                    ) : testimonials.length === 0 ? (
                      <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                        <p className="text-sm font-bold text-gray-600">No Testimonials Yet</p>
                        <p className="text-xs text-gray-400 mt-1">Add your first testimonial using the form on the left.</p>
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-[640px] overflow-y-auto pr-1">
                        {testimonials.map((item, idx) => (
                          <div
                            key={item.id || idx}
                            className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-2xs hover:shadow-sm transition-all space-y-2.5"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-center gap-3">
                                {item.image ? (
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-11 h-11 rounded-full object-cover border-2 border-saffron flex-shrink-0"
                                  />
                                ) : (
                                  <div className="w-11 h-11 rounded-full bg-navy text-saffron flex items-center justify-center font-bold text-sm flex-shrink-0">
                                    {item.name?.charAt(0) || "U"}
                                  </div>
                                )}
                                <div>
                                  <h4 className="font-extrabold text-navy text-sm leading-tight">{item.name}</h4>
                                  <p className="text-[11px] text-indiagreen font-semibold leading-tight">
                                    {item.company ? `${item.designation} • ${item.company}` : item.designation}
                                  </p>
                                  <span className="text-amber-500 text-xs font-bold">
                                    {"★".repeat(item.rating || 5)}
                                  </span>
                                </div>
                              </div>

                              {/* Controls */}
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <button
                                  onClick={() => handleStartEditTestimonial(item)}
                                  className="text-xs font-bold text-navy bg-gray-50 hover:bg-gray-100 px-2.5 py-1 rounded-lg border border-gray-200 transition-colors"
                                >
                                  ✏️ Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteTestimonial(item.id, item.name)}
                                  className="text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-lg border border-red-200 transition-colors"
                                >
                                  🗑️ Delete
                                </button>
                              </div>
                            </div>

                            {item.headline && (
                              <p className="text-xs font-bold text-saffron uppercase tracking-wider">
                                "{item.headline}"
                              </p>
                            )}

                            <p className="text-xs text-gray-700 italic leading-relaxed bg-gray-50/70 p-3 rounded-xl border border-gray-100">
                              "{item.quote}"
                            </p>

                            <div className="flex justify-between items-center text-[10px] text-gray-400 pt-1">
                              <span>{countWords(item.quote)} words</span>
                              <span>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Default"}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 7: ADMIN PROFILE INFO */}
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
