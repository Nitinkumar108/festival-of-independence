import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

const journeyMilestones = [
  {
    step: 1,
    date: "1 SEPTEMBER 2026",
    title: "COURSE COMMENCEMENT",
    subtitle: "The Journey Begins",
    description: "Orientation, onboarding and setting intentions for a transformative 1-year journey of self-discovery.",
    badgeColor: "border-blue-500 text-blue-600 bg-blue-50",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    tags: ["Orientation", "Registration", "Kickoff"]
  },
  {
    step: 2,
    date: "13 OCTOBER 2026",
    title: "LEVEL 1 COMPLETION WITH EXAM",
    subtitle: "First Milestone Assessment",
    description: "Testing foundational knowledge, value orientation, and practical principles taught in Level 1.",
    badgeColor: "border-emerald-500 text-emerald-600 bg-emerald-50",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    tags: ["Exam", "Certification", "Level 1"]
  },
  {
    step: 3,
    date: "31 OCTOBER 2026",
    title: "UDAYA",
    subtitle: "The Awakening Retreat",
    description: "An inspiring day-long retreat featuring meditation, spiritual discourses, soul-stirring kirtan, and lamp offerings.",
    badgeColor: "border-saffron text-saffron bg-amber-50",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    tags: ["Meditation", "Kirtan", "Retreat", "Sangha"]
  },
  {
    step: 4,
    date: "NOV 2026 – JAN 2027",
    title: "LEVEL 2 CLASSES",
    subtitle: "Deeper Wisdom & Values",
    description: "Interactive weekly sessions exploring ethical leadership, character development, and ancient wisdom.",
    badgeColor: "border-indigo-500 text-indigo-600 bg-indigo-50",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    tags: ["Weekly Classes", "Level 2", "Leadership"]
  },
  {
    step: 5,
    date: "30–31 JAN / 7–8 FEB 2027",
    title: "SANGAM",
    subtitle: "The Gathering of Hearts",
    description: "A major youth convention bringing together hundreds of students for bonfire fellowship, music, and learning.",
    badgeColor: "border-amber-600 text-amber-700 bg-orange-50",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    tags: ["Convention", "Fellowship", "Campfire", "Music"]
  },
  {
    step: 6,
    date: "FEB – MAY 2027",
    title: "LEVEL 3 CLASSES",
    subtitle: "Advanced Spiritual Science",
    description: "Advanced seminars covering deep spiritual philosophy, mind management, and purposeful living.",
    badgeColor: "border-teal-500 text-teal-600 bg-teal-50",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 01-2 2h-0a2 2 0 01-2-2v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    tags: ["Advanced", "Level 3", "Mind Control"]
  },
  {
    step: 7,
    date: "5–6 JUNE 2027",
    title: "IMPRESSION CAMP",
    subtitle: "The Final Impression of the Journey",
    description: "The grand finale camp celebrating 1 year of growth, self-realization, reflection, and lifelong bonds.",
    badgeColor: "border-red-500 text-red-600 bg-red-50",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    tags: ["Grand Finale", "Camp", "Transformation"]
  }
];

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
    <div className="w-full min-h-screen bg-cream/40 py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Journey Timeline Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-saffron font-bold text-xs sm:text-sm tracking-widest uppercase bg-saffron/10 px-4 py-1.5 rounded-full inline-block mb-3">
            A Journey to Real Independence
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-navy leading-tight mb-3">
            The 1 Year Journey
          </h1>
          <p className="text-gray-600 text-sm sm:text-lg italic font-medium mb-6">
            "One year. Seven milestones. A lifetime of transformation."
          </p>

          {/* 4 Core Action Pillars Banner */}
          <div className="flex flex-wrap justify-center items-center gap-3 text-xs sm:text-sm font-bold text-navy bg-white py-3 px-6 rounded-full shadow-sm border border-amber-200/80 max-w-2xl mx-auto">
            <span className="text-navy flex items-center gap-1.5">📖 LEARN</span>
            <span className="text-saffron">•</span>
            <span className="text-indiagreen flex items-center gap-1.5">🌱 GROW</span>
            <span className="text-saffron">•</span>
            <span className="text-indigo-600 flex items-center gap-1.5">🤲 SERVE</span>
            <span className="text-saffron">•</span>
            <span className="text-amber-600 flex items-center gap-1.5">⭐ REALIZE</span>
          </div>
        </div>

        {/* Timeline Roadmap Section */}
        <div className="relative mb-20">
          {/* Vertical Connecting Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-saffron via-indiagreen to-navy rounded-full -translate-x-1/2 hidden sm:block"></div>

          <div className="space-y-8 sm:space-y-12">
            {journeyMilestones.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={item.step}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Badge Node Circle */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white border-4 border-saffron shadow-lg flex items-center justify-center font-extrabold text-navy text-sm sm:text-base hidden sm:flex">
                    {item.step}
                  </div>

                  {/* Card Container */}
                  <div className="w-full md:w-1/2 px-0 md:px-8">
                    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                      
                      {/* Milestone Header */}
                      <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-3">
                        <div className="flex items-center gap-2.5">
                          <div className={`p-2 rounded-xl border ${item.badgeColor}`}>
                            {item.icon}
                          </div>
                          <span className="text-xs sm:text-sm font-extrabold text-saffron tracking-wider">
                            MILESTONE {item.step}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          📅 {item.date}
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <h3 className="text-lg sm:text-xl font-bold text-navy mb-1 group-hover:text-saffron transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-indiagreen mb-3">
                        {item.subtitle}
                      </p>

                      {/* Description */}
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="text-[11px] font-medium text-gray-600 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section Divider Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 pt-8 border-t border-gray-200">
          <span className="text-indiagreen font-bold text-xs tracking-wider uppercase bg-indiagreen/10 px-3.5 py-1 rounded-full inline-block mb-2">
            Scheduled Sessions & Workshops
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy mb-2">
            Available Program Registrations
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Sign up for specific upcoming festival sessions and interactive workshops below.
          </p>
        </div>

        {/* Dynamic Backend Events Registration Grid */}
        {loading && <p className="text-gray-500 text-center py-10">Loading upcoming programs…</p>}

        {!loading && events.length === 0 && (
          <div className="text-center py-12 border rounded-2xl bg-white shadow-sm">
            <p className="text-gray-500 text-sm">No specific sessions scheduled at the moment. Please check back soon!</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {events.map((e) => (
            <div key={e.id} className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                {e.posterUrl ? (
                  <img
                    src={e.posterUrl}
                    alt={e.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-40 bg-gradient-to-r from-navy to-indigo-950 flex items-center justify-center p-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-white text-center">{e.title}</h2>
                  </div>
                )}

                <div className="p-5 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-navy mb-2">{e.title}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mb-3">
                    <span>📅 {new Date(e.dateTime).toLocaleString()}</span>
                    {e.venue && <span>📍 {e.venue}</span>}
                  </div>

                  {e.description && (
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-4 whitespace-pre-wrap">
                      {e.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-gray-100 flex items-center justify-between">
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
    </div>
  );
}
