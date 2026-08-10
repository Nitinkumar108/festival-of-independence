import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  BookOpen,
  User,
  Megaphone,
  Award,
  CheckCircle2,
  Sparkles,
  Clock,
  Download,
  ExternalLink,
  ShieldCheck,
  LogOut,
  Video,
  BookMarked,
  MapPin,
} from "lucide-react";

const defaultCourses = [
  {
    id: "level-1",
    title: "Level 1: Foundational Values & Leadership",
    subtitle: "Clarity & Character Building",
    status: "Active & Enrolled",
    statusColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    progress: 100,
    startDate: "1 September 2026",
    examDate: "13 October 2026",
    topics: [
      "Mind Management & Focus",
      "Law of Karma & Ethical Choices",
      "Science of Consciousness",
      "Leadership Principles from Bhagavad Gita"
    ],
    joiningLink: "https://zoom.us/j/iyf-level1-session",
    studyMaterial: "Level_1_Student_Guide_2026.pdf"
  },
  {
    id: "level-2",
    title: "Level 2: Ethical Living & Mind Science",
    subtitle: "Competence & Habits Mastery",
    status: "Upcoming (Nov 2026)",
    statusColor: "bg-blue-100 text-blue-800 border-blue-300",
    progress: 0,
    startDate: "November 2026",
    examDate: "January 2027",
    topics: [
      "Overcoming Addiction & Distractions",
      "Time Management for Peak Performance",
      "Building Resilience & Emotional Quotient",
      "Service & Community Leadership"
    ],
    joiningLink: null,
    studyMaterial: null
  },
  {
    id: "level-3",
    title: "Level 3: Advanced Spiritual Philosophy",
    subtitle: "Compassion & Pure Conscience",
    status: "Upcoming (Feb 2027)",
    statusColor: "bg-amber-100 text-amber-800 border-amber-300",
    progress: 0,
    startDate: "February 2027",
    examDate: "May 2027",
    topics: [
      "Deep Meditation Techniques",
      "Self-Realization & Purpose of Life",
      "National Building & Social Impact",
      "Mentorship & Youth Leadership"
    ],
    joiningLink: null,
    studyMaterial: null
  }
];

export default function StudentDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("events"); // "events" | "courses" | "personal" | "notifications" | "certificates"

  // Profile Edit Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "male",
    email: "",
    phoneNumber: "",
    address: "",
    location: "Kolkata, WB",
    postalCode: "700017",
    collegeName: "",
    dob: "2002-08-15"
  });
  const [saveStatus, setSaveStatus] = useState(null);

  useEffect(() => {
    fetchProfileData();
  }, []);

  function getClearedNotificationIds(studentId) {
    try {
      const stored = localStorage.getItem(`cleared_notifications_${studentId || 'guest'}`);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  async function fetchProfileData() {
    try {
      const res = await api.get("/students/me");
      const p = res.data;
      setProfile(p);

      // Split full name into first and last name for the form
      const parts = (p.fullName || "").trim().split(" ");
      const firstName = parts[0] || "";
      const lastName = parts.slice(1).join(" ") || "";

      setFormData({
        firstName: firstName,
        lastName: lastName,
        gender: p.gender || "Male",
        email: p.email || "",
        phoneNumber: p.phoneNumber || "",
        address: p.address || "3C Albert Road, Near Minto Park",
        location: "Kolkata, West Bengal",
        postalCode: "700017",
        collegeName: p.College?.name || "",
        dob: "2002-08-15"
      });

      // Fetch notifications and filter out cleared IDs for this student
      api.get("/students/me/notifications").then((notifRes) => {
        const clearedIds = getClearedNotificationIds(p.id);
        const activeNotifs = (notifRes.data || []).filter((n) => !clearedIds.includes(n.id));
        setNotifications(activeNotifs);
      }).catch(() => {});

    } catch (err) {
      console.error(err);
    }

    api.get("/students/me/schedule").then((res) => setSchedule(res.data)).catch(() => {});
    api.get("/students/me/registered-events").then((res) => setRegisteredEvents(res.data)).catch(() => {});
  }

  function handleFormChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSaveProfile(e) {
    if (e) e.preventDefault();
    setSaveStatus("saving");
    try {
      const updatedFullName = `${formData.firstName} ${formData.lastName}`.trim();
      await api.put("/students/me", {
        fullName: updatedFullName,
        gender: formData.gender,
        phoneNumber: formData.phoneNumber,
        address: formData.address
      });
      setSaveStatus("success");
      toast.success("Profile updated successfully!");
      setProfile((prev) => ({
        ...prev,
        fullName: updatedFullName,
        gender: formData.gender,
        phoneNumber: formData.phoneNumber,
        address: formData.address
      }));
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err) {
      setSaveStatus("error");
      toast.error("Failed to update profile.");
    }
  }

  function handleDiscardChanges() {
    if (profile) {
      const parts = (profile.fullName || "").trim().split(" ");
      setFormData((prev) => ({
        ...prev,
        firstName: parts[0] || "",
        lastName: parts.slice(1).join(" ") || "",
        gender: profile.gender || "Male",
        phoneNumber: profile.phoneNumber || "",
        address: profile.address || ""
      }));
      setSaveStatus(null);
    }
  }

  // Clear Announcement Handlers (Persisted in localStorage)
  function handleClearAllAnnouncements() {
    const studentId = profile?.id || user?.id || "guest";
    const allIds = notifications.map((n) => n.id);
    const existing = getClearedNotificationIds(studentId);
    const updated = Array.from(new Set([...existing, ...allIds]));
    localStorage.setItem(`cleared_notifications_${studentId}`, JSON.stringify(updated));
    setNotifications([]);
  }

  function handleDismissAnnouncement(id) {
    const studentId = profile?.id || user?.id || "guest";
    const existing = getClearedNotificationIds(studentId);
    const updated = Array.from(new Set([...existing, id]));
    localStorage.setItem(`cleared_notifications_${studentId}`, JSON.stringify(updated));
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }

  function handleLogoutClick() {
    logout();
    navigate("/");
  }

  if (!profile) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-24 text-center text-gray-500">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded-2xl w-1/3 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex-1 flex flex-col bg-[#F4F4F8] py-3 sm:py-5 px-3 sm:px-6 font-sans">
      
      {/* Top Notice Banner if announcements exist */}
      {notifications.length > 0 && (
        <div className="w-full max-w-6xl mx-auto mb-3 sm:mb-4 bg-amber-50/90 border border-amber-200/80 rounded-2xl p-3 sm:p-4 shadow-sm flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-navy">
            <span className="text-base">📢</span>
            <span>You have <strong className="text-saffron">{notifications.length}</strong> active announcement(s) from IYF Kolkata.</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("notifications")}
              className="text-xs font-bold text-saffron underline hover:text-navy"
            >
              View All
            </button>
            <button
              onClick={handleClearAllAnnouncements}
              className="text-xs font-bold text-gray-600 hover:text-red-600 bg-white px-3 py-1 rounded-xl border border-amber-200 transition-colors shadow-2xs"
            >
              Clear All ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Card Dashboard Container */}
      <div className="w-full max-w-6xl mx-auto flex-1 flex flex-col bg-white rounded-[28px] sm:rounded-[34px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)] border border-gray-100/90 overflow-hidden my-auto">
        <div className="grid md:grid-cols-12 flex-1 w-full items-stretch">
          
          {/* Left Column: Profile Sidebar Nav (md:col-span-4 lg:col-span-3) */}
          <div className="md:col-span-4 lg:col-span-3 bg-slate-50/90 border-r border-gray-100 p-5 sm:p-6 flex flex-col justify-between h-full">
            <div className="space-y-6">
              
              {/* Avatar & Info Header */}
              <div className="flex flex-col items-center text-center pt-2">
                <div className="relative mb-3.5 group">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#FFB877] via-[#FF8432] to-[#311D4E] text-white flex items-center justify-center font-extrabold text-2xl sm:text-3xl shadow-md ring-4 ring-white">
                    {profile.fullName?.charAt(0).toUpperCase() || "S"}
                  </div>
                  <button
                    aria-label="Edit Profile Avatar"
                    className="absolute bottom-0.5 right-1 w-7 h-7 bg-saffron text-navy rounded-full flex items-center justify-center text-xs shadow-md hover:scale-110 transition-transform ring-2 ring-white"
                  >
                    ✏️
                  </button>
                </div>

                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-navy mb-0.5">{profile.fullName}</h2>
                <p className="text-xs font-medium text-gray-500 mb-2">
                  Student Participant
                </p>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50/90 px-3 py-1 rounded-full border border-emerald-200">
                  ✓ Verified Account
                </span>
              </div>

              {/* Sidebar Menu Items */}
              <nav className="space-y-1.5 pt-2">
                <button
                  onClick={() => setActiveTab("events")}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                    activeTab === "events"
                      ? "bg-amber-100/70 text-saffron shadow-2xs"
                      : "text-gray-600 hover:bg-gray-100/80"
                  }`}
                >
                  <CalendarDays className="w-4 h-4 text-saffron" /> Schedule & Events ({registeredEvents.length})
                </button>

                <button
                  onClick={() => setActiveTab("courses")}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                    activeTab === "courses"
                      ? "bg-amber-100/70 text-saffron shadow-2xs"
                      : "text-gray-600 hover:bg-gray-100/80"
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-saffron" /> My Courses ({defaultCourses.length})
                </button>

                <button
                  onClick={() => setActiveTab("personal")}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                    activeTab === "personal"
                      ? "bg-amber-100/70 text-saffron shadow-2xs"
                      : "text-gray-600 hover:bg-gray-100/80"
                  }`}
                >
                  <User className="w-4 h-4 text-saffron" /> Personal Information
                </button>

                <button
                  onClick={() => setActiveTab("notifications")}
                  className={`w-full flex items-center justify-between px-4 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                    activeTab === "notifications"
                      ? "bg-amber-100/70 text-saffron shadow-2xs"
                      : "text-gray-600 hover:bg-gray-100/80"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Megaphone className="w-4 h-4 text-saffron" /> Announcements
                  </span>
                  {notifications.length > 0 && (
                    <span className="text-[10px] font-extrabold text-white bg-saffron px-2 py-0.5 rounded-full">
                      {notifications.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab("certificates")}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                    activeTab === "certificates"
                      ? "bg-amber-100/70 text-saffron shadow-2xs"
                      : "text-gray-600 hover:bg-gray-100/80"
                  }`}
                >
                  <Award className="w-4 h-4 text-saffron" /> Certificates
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

          {/* Right Column: Tab Content (md:col-span-8 lg:col-span-9) */}
          <div className="md:col-span-8 lg:col-span-9 p-5 sm:p-8 lg:p-10 flex flex-col justify-between h-full overflow-y-auto">
            
            {/* 1. PERSONAL INFORMATION FORM TAB */}
            {activeTab === "personal" && (
              <form onSubmit={handleSaveProfile} className="space-y-6">
                
                {/* Header */}
                <div className="border-b border-gray-100 pb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-extrabold tracking-tight text-navy">Personal Information</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Manage your identity details, contact info and location.</p>
                  </div>
                  <span className="text-xs font-bold text-saffron bg-saffron/10 px-3 py-1 rounded-full">
                    Student Profile
                  </span>
                </div>

                {/* Gender Selector */}
                <div className="bg-gray-50/70 p-3.5 rounded-2xl border border-gray-100 flex items-center gap-6 text-xs sm:text-sm">
                  <span className="font-bold text-navy">Gender:</span>
                  <label className="flex items-center gap-2 cursor-pointer font-semibold text-gray-700">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={formData.gender?.toLowerCase() === "male"}
                      onChange={handleFormChange}
                      className="accent-saffron w-4 h-4"
                    />
                    Male
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-semibold text-gray-700">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={formData.gender?.toLowerCase() === "female"}
                      onChange={handleFormChange}
                      className="accent-saffron w-4 h-4"
                    />
                    Female
                  </label>
                </div>

                {/* Form Input Fields Grid */}
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 text-xs sm:text-sm">
                  
                  {/* First Name */}
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">First Name</label>
                    <input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleFormChange}
                      className="w-full bg-gray-100/80 rounded-xl px-4 py-3 text-navy font-semibold focus:bg-white focus:ring-2 focus:ring-saffron transition-all border-0"
                      placeholder="First Name"
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Last Name</label>
                    <input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleFormChange}
                      className="w-full bg-gray-100/80 rounded-xl px-4 py-3 text-navy font-semibold focus:bg-white focus:ring-2 focus:ring-saffron transition-all border-0"
                      placeholder="Last Name"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="sm:col-span-2 relative">
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email Address</label>
                    <input
                      name="email"
                      value={formData.email}
                      readOnly
                      className="w-full bg-gray-100/80 rounded-xl px-4 py-3 text-gray-600 font-semibold border-0 cursor-not-allowed pr-24"
                    />
                    <span className="absolute right-3.5 top-[35px] text-[11px] font-bold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      ✓ Verified
                    </span>
                  </div>

                  {/* Full Address */}
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Street Address</label>
                    <input
                      name="address"
                      value={formData.address}
                      onChange={handleFormChange}
                      className="w-full bg-gray-100/80 rounded-xl px-4 py-3 text-navy font-semibold focus:bg-white focus:ring-2 focus:ring-saffron transition-all border-0"
                      placeholder="Street Address"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Phone Number</label>
                    <input
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleFormChange}
                      className="w-full bg-gray-100/80 rounded-xl px-4 py-3 text-navy font-semibold focus:bg-white focus:ring-2 focus:ring-saffron transition-all border-0"
                      placeholder="Phone Number"
                    />
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Date of Birth</label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleFormChange}
                      className="w-full bg-gray-100/80 rounded-xl px-4 py-3 text-navy font-semibold focus:bg-white focus:ring-2 focus:ring-saffron transition-all border-0"
                    />
                  </div>

                  {/* City & State Location */}
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">City / Location</label>
                    <input
                      name="location"
                      value={formData.location}
                      onChange={handleFormChange}
                      className="w-full bg-gray-100/80 rounded-xl px-4 py-3 text-navy font-semibold focus:bg-white focus:ring-2 focus:ring-saffron transition-all border-0"
                    />
                  </div>

                  {/* Postal Code */}
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Postal Code</label>
                    <input
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleFormChange}
                      className="w-full bg-gray-100/80 rounded-xl px-4 py-3 text-navy font-semibold focus:bg-white focus:ring-2 focus:ring-saffron transition-all border-0"
                    />
                  </div>

                </div>

                {/* Status Messages */}
                {saveStatus === "success" && (
                  <p className="text-xs font-bold text-emerald-700 bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-center">
                    ✓ Profile updated successfully!
                  </p>
                )}
                {saveStatus === "error" && (
                  <p className="text-xs font-bold text-red-600 bg-red-50 p-3 rounded-xl border border-red-200 text-center">
                    Failed to update profile. Please try again.
                  </p>
                )}

                {/* Bottom Action Buttons */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={handleDiscardChanges}
                    className="border-2 border-saffron text-saffron hover:bg-saffron/10 font-bold text-xs sm:text-sm py-3 px-6 rounded-xl transition-colors"
                  >
                    Discard Changes
                  </button>
                  <button
                    type="submit"
                    disabled={saveStatus === "saving"}
                    className="bg-saffron text-white font-bold text-xs sm:text-sm py-3 px-8 rounded-xl hover:bg-saffron/90 transition-all shadow-xs disabled:opacity-60"
                  >
                    {saveStatus === "saving" ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            )}

            {/* 2. MY COURSES TAB */}
            {activeTab === "courses" && (
              <div className="space-y-5">
                <div className="border-b border-gray-100 pb-3 flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-extrabold text-navy">My Enrolled Courses</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Track your 1-Year Journey syllabus, classes & study guides.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {defaultCourses.map((course) => (
                    <div
                      key={course.id}
                      className="bg-gray-50/80 rounded-2xl p-5 border border-gray-100 hover:bg-white hover:shadow-sm transition-all space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${course.statusColor}`}>
                            {course.status}
                          </span>
                          <h3 className="text-base font-bold text-navy mt-1.5">{course.title}</h3>
                          <p className="text-xs font-semibold text-indiagreen">{course.subtitle}</p>
                        </div>

                        {course.joiningLink && (
                          <a
                            href={course.joiningLink}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-saffron text-navy font-bold text-xs px-4 py-2 rounded-xl hover:bg-indiagreen hover:text-white transition-all text-center self-start sm:self-auto shadow-2xs"
                          >
                            🎥 Join Live Class
                          </a>
                        )}
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3 text-xs bg-white p-3.5 rounded-xl border border-gray-100">
                        <div>
                          <p className="font-bold text-navy mb-1">📖 Syllabus Topics:</p>
                          <ul className="space-y-0.5 text-gray-600 list-disc list-inside text-[11px]">
                            {course.topics.map((t, idx) => (
                              <li key={idx}>{t}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-1 text-[11px]">
                          <p className="text-gray-700"><strong>Start Date:</strong> {course.startDate}</p>
                          <p className="text-gray-700"><strong>Exam Milestone:</strong> {course.examDate}</p>
                          {course.studyMaterial && (
                            <p className="text-saffron font-bold">📄 Guide: {course.studyMaterial}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. SCHEDULE & EVENTS TAB */}
            {activeTab === "events" && (
              <div className="space-y-5">
                <div className="border-b border-gray-100 pb-3">
                  <h2 className="text-xl font-extrabold text-navy">Registered Sessions & Schedule</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Live workshops and interactive programs you registered for.</p>
                </div>

                {registeredEvents.length === 0 ? (
                  <div className="bg-gray-50 rounded-2xl p-8 text-center border border-gray-100">
                    <p className="text-gray-500 text-xs sm:text-sm mb-3">You haven't registered for any individual sessions yet.</p>
                    <Link
                      to="/"
                      className="inline-block bg-saffron text-navy font-bold text-xs px-5 py-2.5 rounded-xl hover:opacity-90"
                    >
                      Explore Home Page Sessions
                    </Link>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {registeredEvents.map((ev) => (
                      <div key={ev.id} className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex flex-col justify-between">
                        <div>
                          {ev.posterUrl && (
                            <img
                              src={ev.posterUrl}
                              alt={ev.title}
                              className="w-full h-32 object-cover rounded-xl mb-2.5"
                            />
                          )}
                          <h4 className="font-bold text-navy text-sm mb-1">{ev.title}</h4>
                          <p className="text-[11px] text-gray-500">📅 {new Date(ev.dateTime).toLocaleString()}</p>
                          {ev.venue && <p className="text-[11px] text-gray-600">📍 {ev.venue}</p>}
                        </div>
                        <span className="mt-2.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200 self-start">
                          ✓ Registered
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 4. ANNOUNCEMENTS TAB */}
            {activeTab === "notifications" && (
              <div className="space-y-5">
                <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-extrabold text-navy">Announcements</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Official updates from festival coordinators.</p>
                  </div>
                  {notifications.length > 0 && (
                    <button
                      onClick={handleClearAllAnnouncements}
                      className="text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-xl border border-red-200 transition-colors shadow-2xs"
                    >
                      Clear All Announcements ✕
                    </button>
                  )}
                </div>

                {notifications.length === 0 ? (
                  <div className="bg-gray-50 rounded-2xl p-8 text-center border border-gray-100">
                    <p className="text-gray-500 text-xs sm:text-sm italic">No active announcements right now.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {notifications.map((n) => (
                      <div key={n.id} className="bg-amber-50/60 rounded-2xl p-4 border border-amber-200/70 relative group">
                        <div className="flex justify-between items-start mb-1 pr-6">
                          <h4 className="font-bold text-navy text-sm">{n.title}</h4>
                          <span className="text-[10px] text-gray-400">{new Date(n.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed">{n.message}</p>
                        
                        {/* Individual Dismiss Button */}
                        <button
                          onClick={() => handleDismissAnnouncement(n.id)}
                          aria-label="Dismiss Announcement"
                          className="absolute top-3 right-3 text-xs font-bold text-gray-400 hover:text-red-600 p-1"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 5. CERTIFICATES TAB */}
            {activeTab === "certificates" && (
              <div className="space-y-5 text-center my-auto py-8">
                <div className="w-16 h-16 bg-amber-50 text-saffron rounded-full flex items-center justify-center mx-auto text-3xl shadow-2xs">
                  🏆
                </div>
                <h2 className="text-xl font-extrabold text-navy">Course Certificates & Badges</h2>
                <p className="text-xs text-gray-600 max-w-sm mx-auto leading-relaxed">
                  Official certificates for Level 1, Level 2, Level 3, and the 1-Year Journey will be available for download upon milestone completion and exam verification.
                </p>
                <span className="inline-block text-xs font-bold text-amber-700 bg-amber-50 px-4 py-2 rounded-xl border border-amber-200">
                  🔒 Level 1 Certificate Unlocks On 13 October 2026
                </span>
              </div>
            )}

          </div>

        </div>
      </div>

    </div>
  );
}
