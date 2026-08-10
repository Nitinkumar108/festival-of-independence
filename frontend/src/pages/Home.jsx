import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import TestimonialsSection from "../components/TestimonialsSection.jsx";
import ContactSection from "../components/ContactSection.jsx";
import FaqSection from "../components/FaqSection.jsx";

const heroImages = [
  {
    url: "/slideshow/national_flag.png",
    name: "National Flag",
    alt: "Indian National Flag"
  },
  {
    url: "/slideshow/tovp_mayapur.png",
    name: "TOVP Mayapur",
    alt: "Temple of the Vedic Planetarium (TOVP), Mayapur"
  },
  {
    url: "/slideshow/somnath_temple.png",
    name: "Somnath Temple",
    alt: "Somnath Temple, Gujarat"
  },
  {
    url: "/slideshow/tirupati_balaji.png",
    name: "Tirupati Balaji Temple",
    alt: "Sri Venkateswara Swamy Temple (Tirupati Balaji), Tirumala"
  },
  {
    url: "/slideshow/taj_mahal.png",
    name: "Taj Mahal",
    alt: "Taj Mahal, Agra"
  },
  {
    url: "/slideshow/lotus_temple.png",
    name: "Lotus Temple of Delhi",
    alt: "Lotus Temple, Delhi"
  }
];

const nashaMuktPosters = [
  {
    url: "/nasha_mukt/nasha_mukt_1.jpg",
    title: "नशे से दूरी, सुनहरे कल के लिए है जरूरी",
    subtitle: "Viksit Bharat @2047",
    tag: "संकल्प अभियान",
  },
  {
    url: "/nasha_mukt/nasha_mukt_2.png",
    title: "Say NO to Drugs, YES to Life",
    subtitle: "Pledge for a Drug-Free Future",
    tag: "Take the Pledge",
  },
];

const journeyMilestones = [
  {
    step: 1,
    date: "1 SEPTEMBER 2026",
    title: "COURSE COMMENCEMENT",
    subtitle: "The Journey Begins",
    description: "Orientation, onboarding and setting intentions for a transformative 1-year journey of self-discovery.",
    badgeColor: "border-blue-500 text-blue-600 bg-blue-50",
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    tags: ["Orientation", "Kickoff"]
  },
  {
    step: 2,
    date: "13 OCTOBER 2026",
    title: "LEVEL 1 COMPLETION",
    subtitle: "First Milestone Assessment",
    description: "Testing foundational knowledge, value orientation, and practical principles taught in Level 1.",
    badgeColor: "border-emerald-500 text-emerald-600 bg-emerald-50",
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    tags: ["Exam", "Level 1"]
  },
  {
    step: 3,
    date: "31 OCTOBER 2026",
    title: "UDAYA",
    subtitle: "The Awakening Retreat",
    description: "An inspiring day-long retreat featuring meditation, spiritual discourses, soul-stirring kirtan, and lamp offerings.",
    badgeColor: "border-saffron text-saffron bg-amber-50",
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    tags: ["Meditation", "Kirtan", "Retreat"]
  },
  {
    step: 4,
    date: "NOV 2026 – JAN 2027",
    title: "LEVEL 2 CLASSES",
    subtitle: "Deeper Wisdom & Values",
    description: "Interactive weekly sessions exploring ethical leadership, character development, and ancient wisdom.",
    badgeColor: "border-indigo-500 text-indigo-600 bg-indigo-50",
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    tags: ["Weekly Classes", "Leadership"]
  },
  {
    step: 5,
    date: "30–31 JAN / 7–8 FEB 2027",
    title: "SANGAM",
    subtitle: "The Gathering of Hearts",
    description: "A major youth convention bringing together hundreds of students for bonfire fellowship, music, and learning.",
    badgeColor: "border-amber-600 text-amber-700 bg-orange-50",
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    tags: ["Convention", "Fellowship", "Music"]
  },
  {
    step: 6,
    date: "FEB – MAY 2027",
    title: "LEVEL 3 CLASSES",
    subtitle: "Advanced Spiritual Science",
    description: "Advanced seminars covering deep spiritual philosophy, mind management, and purposeful living.",
    badgeColor: "border-teal-500 text-teal-600 bg-teal-50",
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 01-2 2h-0a2 2 0 01-2-2v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    tags: ["Level 3", "Mind Control"]
  },
  {
    step: 7,
    date: "5–6 JUNE 2027",
    title: "IMPRESSION CAMP",
    subtitle: "The Final Impression of the Journey",
    description: "The grand finale camp celebrating 1 year of growth, self-realization, reflection, and lifelong bonds.",
    badgeColor: "border-red-500 text-red-600 bg-red-50",
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    tags: ["Grand Finale", "Camp"]
  }
];

function AnimatedTimelineItem({ item, isEven }) {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setIsVisible(entry.isIntersecting);
          });
        },
        { threshold: 0.15 }
      );
      if (domRef.current) observer.observe(domRef.current);
      return () => {
        if (domRef.current) observer.unobserve(domRef.current);
      };
    }, []);

    return (
      <div
        ref={domRef}
        className={`relative flex flex-col sm:flex-row items-start sm:items-center ${isEven ? "sm:flex-row-reverse" : ""
          }`}
      >
        {/* Circle Node Badge */}
        <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border-3 border-saffron shadow-sm flex items-center justify-center font-extrabold text-navy text-xs sm:text-sm">
          {item.step}
        </div>

        {/* Timeline Content Card with Side Entrance Animation */}
        <div
          className={`w-full sm:w-1/2 pl-11 sm:pl-0 sm:px-6 transition-all duration-700 ease-out ${isVisible
              ? "opacity-100 translate-x-0"
              : isEven
                ? "opacity-0 translate-x-10 sm:-translate-x-16"
                : "opacity-0 -translate-x-10 sm:translate-x-16"
            }`}
        >
          <div className="bg-cream/40 rounded-xl p-4 border border-gray-100 shadow-xs hover:shadow-md hover:bg-white hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-2 border-b border-gray-100/80 pb-2">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-extrabold text-saffron tracking-wider">
                  MILESTONE {item.step}
                </span>
              </div>
              <span className="text-[10px] font-bold text-gray-500 bg-white px-2 py-0.5 rounded-full border border-gray-100">
                📅 {item.date}
              </span>
            </div>

            <h3 className="text-sm sm:text-base font-bold text-navy mb-0.5 group-hover:text-saffron transition-colors">
              {item.title}
            </h3>
            <p className="text-xs font-semibold text-indiagreen mb-1.5">
              {item.subtitle}
            </p>
            <p className="text-gray-600 text-xs leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    );
  }

export default function Home() {
  const { user, token, role } = useAuth();
  const [heroIndex, setHeroIndex] = useState(0);
  const [selectedPoster, setSelectedPoster] = useState(null);

  // UG Notice State (Persisted in localStorage so it never pops up again once closed)
  const [isUgNoticeDismissed, setIsUgNoticeDismissed] = useState(() => {
    return localStorage.getItem("ug_notice_dismissed") === "true";
  });

  function handleDismissUgNotice() {
    localStorage.setItem("ug_notice_dismissed", "true");
    setIsUgNoticeDismissed(true);
  }

  const handlePrevSlide = () => {
    setHeroIndex((prevIndex) => (prevIndex - 1 + heroImages.length) % heroImages.length);
  };

  const handleNextSlide = () => {
    setHeroIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
  };

  useEffect(() => {
    const heroTimer = setInterval(() => {
      setHeroIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(heroTimer);
  }, []);

  return (
    <div className="w-full min-h-screen overflow-x-hidden">

      {/* 1. Hero Section with Full Background Slideshow */}
      <section className="relative bg-navy text-white overflow-hidden py-16 sm:py-24 px-4">
        {/* Transparent Background Images Slideshow */}
        {heroImages.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              heroIndex === idx ? "opacity-65" : "opacity-0"
            }`}
          >
            <img
              src={img.url}
              alt={img.alt}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/slideshow/somnath_temple.png";
              }}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}

        {/* Navy Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/75 via-navy/55 to-navy/85 pointer-events-none"></div>

        {/* Flag aura glow effects */}
        <div className="absolute top-0 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-saffron/10 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-indiagreen/10 rounded-full blur-3xl translate-x-1/4 translate-y-1/4 pointer-events-none"></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <p className="uppercase tracking-wider text-saffron text-xs sm:text-sm font-bold mb-2 sm:mb-3">
            ISKCON Youth Forum Kolkata presents on the 80th Independence Day of the Holy land of Bharat Varsha
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold mb-2 sm:mb-3 leading-tight">
            Festival of <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron via-white to-indiagreen">Independence</span>
          </h1>
          <p className="text-saffron/90 font-bold text-xs sm:text-base mb-3 tracking-wide uppercase">
            A series of online courses for the UG college students of Kolkata
          </p>
          <p className="max-w-2xl mx-auto text-white/80 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed px-2">
            Exploring, inculcating and celebrating our nation's great social, cultural and spiritual heritage.
          </p>

          {/* Side Badge Tag in Hero */}
          <div className="mb-6 flex justify-center">
            <span className="inline-flex items-center gap-2 bg-saffron/20 text-saffron font-bold text-xs sm:text-sm px-4 py-1.5 rounded-full border border-saffron/40 shadow-xs">
              🎓 <span><strong>Note:</strong> Program strictly for <strong>Under Graduate (UG) College Students</strong></span>
            </span>
          </div>
          {token ? (
            <div className="flex flex-wrap justify-center items-center gap-3">
              <Link
                to={role === "admin" ? "/admin/dashboard" : "/student/dashboard"}
                className="inline-block bg-saffron text-navy font-bold text-sm sm:text-base px-6 sm:px-8 py-3 rounded-full hover:bg-indiagreen hover:text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                📚 My Courses & Dashboard
              </Link>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <Link
                to="/register"
                className="inline-block bg-saffron text-navy font-bold text-sm sm:text-base px-8 sm:px-10 py-3.5 rounded-full hover:bg-indiagreen hover:text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Register Now
              </Link>
            </div>
          )}

          {/* Download Event Brochure Button */}
          <div className="mt-4 flex justify-center">
            <a
              href="/Festival of Independence_Brochure.pdf"
              download="Festival_of_Independence_Brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-saffron hover:text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full border border-saffron/50 backdrop-blur-md transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <svg className="w-4 h-4 text-saffron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>📄 Download Event Brochure (PDF)</span>
            </a>
          </div>
        </div>

        {/* Hero Slideshow Indicator Dots & Location Label */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5">
          <div className="flex space-x-1.5">
            {heroImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setHeroIndex(idx)}
                aria-label={`Go to hero slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  heroIndex === idx ? "w-6 bg-saffron" : "w-1.5 bg-white/40"
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] font-semibold text-white/90 bg-navy/70 px-3 py-0.5 rounded-full backdrop-blur-xs border border-white/20 shadow-xs">
            📍 {heroImages[heroIndex].name}
          </span>
        </div>
      </section>

      {/* 2. Festival Vision & 4 Pillars Section (Rectangular Cards) */}
      <section className="py-10 sm:py-16 px-4 bg-gradient-to-b from-amber-50/70 via-white to-cream relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-5 sm:space-y-6">

          {/* Section Title Header */}
          <div className="mb-2">
            <span className="text-indiagreen font-bold text-[11px] sm:text-xs tracking-wider uppercase bg-indiagreen/10 px-3.5 py-1 rounded-full inline-block mb-2">
              Nation Building Vision
            </span>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-navy leading-tight max-w-3xl mx-auto">
              Let's build a Nation with{" "}
              <span className="text-navy">Clarity</span>,{" "}
              <span className="text-saffron">Character</span>,{" "}
              <span className="text-amber-600">Competence</span> and{" "}
              <span className="text-indiagreen">Compassion</span>
            </h2>
          </div>


          {/* Card 2: Mission Statement */}
          <div className="bg-white rounded-xl shadow-sm border border-blue-100 border-l-4 border-l-navy p-4 sm:p-5 text-center transition-all hover:shadow-md">
            <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed font-medium">
              A small effort to assist the leaders of our nation in their vision of{" "}
              <span className="text-saffron font-bold">
                Developed India (Viksit Bharat - विकसित भारत)
              </span>
              , by helping Indian youths to develop{" "}
              <span className="text-navy font-bold">broad consciousness</span> and{" "}
              <span className="text-indiagreen font-bold">pure conscience</span>.
            </p>
          </div>

          {/* Card 3: Nasha Mukt Yuva Government Initiative Notice */}
          <div className="bg-white rounded-xl shadow-sm border border-amber-200 border-l-4 border-l-saffron p-4 sm:p-5 text-center transition-all hover:shadow-md">
            <p className="text-xs sm:text-sm md:text-base font-semibold text-navy leading-relaxed">
              Specially designed to support the{" "}
              <span className="text-saffron font-extrabold tracking-wide">
                NASHA MUKT YUVA
              </span>{" "}
              for{" "}
              <span className="text-indiagreen font-extrabold">
                Viksit Bharat
              </span>{" "}
              initiative by the{" "}
              <span className="font-extrabold text-navy">
                Ministry of Youth Affairs and Sports, Government of India
              </span>
              ...
            </p>
          </div>

          {/* 2 Campaign Poster Cards Centered */}
          <div className="pt-1 max-w-xl mx-auto">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-[11px] sm:text-xs font-extrabold tracking-wider uppercase text-saffron flex items-center gap-1.5">
                <span>🇮🇳</span> Gen-Z Against Addiction • Campaign Posters
              </span>
              <span className="text-[10px] font-bold text-gray-500 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/80">
                Click to expand 🔍
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 justify-center">
              {nashaMuktPosters.map((poster, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedPoster(poster)}
                  className="group bg-white rounded-2xl p-2.5 sm:p-3 border border-amber-200/80 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative rounded-xl overflow-hidden aspect-[3/4] bg-amber-50/50 mb-2.5 border border-gray-100 shadow-2xs">
                    <img
                      src={poster.url}
                      alt={poster.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2.5">
                      <span className="text-[10px] font-extrabold text-white bg-saffron/95 px-3 py-1 rounded-full shadow-xs">
                        View Poster 🔍
                      </span>
                    </div>
                  </div>
                  <div className="text-left space-y-0.5">
                    <span className="inline-block text-[9px] font-extrabold text-saffron uppercase tracking-wider bg-saffron/10 px-1.5 py-0.5 rounded">
                      {poster.tag}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-navy line-clamp-1 group-hover:text-saffron transition-colors">
                      {poster.title}
                    </h4>
                    <p className="text-[11px] text-gray-500 line-clamp-1">
                      {poster.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: 4 Core Pillars */}
          <div className="bg-white rounded-xl shadow-sm border border-emerald-100 border-t-4 border-t-indiagreen p-4 sm:p-6 text-center">
            <h3 className="text-xs sm:text-sm font-bold text-navy uppercase tracking-wider mb-4">
              The 4 Pillars of Empowerment
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {/* 1. Clarity */}
              <div className="bg-gray-50/80 p-3.5 sm:p-4 rounded-lg border border-gray-100 flex flex-col items-center text-center hover:bg-amber-50/40 transition-colors">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-navy/10 text-navy flex items-center justify-center mb-2 shadow-inner">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 01-2 2h-0a2 2 0 01-2-2v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h4 className="font-bold text-navy text-sm sm:text-base mb-0.5">Clarity</h4>
                <p className="text-gray-600 text-[11px] sm:text-xs leading-relaxed">
                  Think with wisdom and purpose.
                </p>
              </div>

              {/* 2. Character */}
              <div className="bg-gray-50/80 p-3.5 sm:p-4 rounded-lg border border-gray-100 flex flex-col items-center text-center hover:bg-amber-50/40 transition-colors">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-saffron/15 text-saffron flex items-center justify-center mb-2 shadow-inner">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="font-bold text-navy text-sm sm:text-base mb-0.5">Character</h4>
                <p className="text-gray-600 text-[11px] sm:text-xs leading-relaxed">
                  Build inner strength and integrity.
                </p>
              </div>

              {/* 3. Competence */}
              <div className="bg-gray-50/80 p-3.5 sm:p-4 rounded-lg border border-gray-100 flex flex-col items-center text-center hover:bg-amber-50/40 transition-colors">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-500/15 text-amber-600 flex items-center justify-center mb-2 shadow-inner">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="font-bold text-navy text-sm sm:text-base mb-0.5">Competence</h4>
                <p className="text-gray-600 text-[11px] sm:text-xs leading-relaxed">
                  Excel in skills and knowledge.
                </p>
              </div>

              {/* 4. Compassion */}
              <div className="bg-gray-50/80 p-3.5 sm:p-4 rounded-lg border border-gray-100 flex flex-col items-center text-center hover:bg-amber-50/40 transition-colors">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-indiagreen/15 text-indiagreen flex items-center justify-center mb-2 shadow-inner">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h4 className="font-bold text-navy text-sm sm:text-base mb-0.5">Compassion</h4>
                <p className="text-gray-600 text-[11px] sm:text-xs leading-relaxed">
                  Serve with empathy and humility.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. The 1 Year Journey Timeline Section (Medium-Sized Vertical Timeline) */}
      <section className="py-10 sm:py-16 px-4 bg-white border-t border-amber-100/50">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="text-saffron font-bold text-[11px] sm:text-xs tracking-wider uppercase bg-saffron/10 px-3.5 py-1 rounded-full inline-block mb-2">
              A Journey to Real Independence
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy leading-tight mb-2">
              The 1 Year Journey
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm italic font-medium mb-4">
              "One year. Seven milestones. A lifetime of transformation."
            </p>

            {/* Compact 4 Action Pillars */}
            <div className="flex flex-wrap justify-center items-center gap-2 text-xs font-bold text-navy bg-cream/70 py-1.5 px-4 rounded-full border border-amber-200/80 max-w-md mx-auto">
              <span className="text-navy">📖 LEARN</span>
              <span className="text-saffron">•</span>
              <span className="text-indiagreen">🌱 GROW</span>
              <span className="text-saffron">•</span>
              <span className="text-indigo-600">🤲 SERVE</span>
              <span className="text-saffron">•</span>
              <span className="text-amber-600">⭐ REALIZE</span>
            </div>
          </div>

          {/* Vertical Timeline Roadmap (Medium-Sized) */}
          <div className="relative">
            {/* Center Line for Desktop / Left Line for Mobile */}
            <div className="absolute left-4 sm:left-1/2 top-2 bottom-2 w-0.5 bg-gradient-to-b from-saffron via-indiagreen to-navy rounded-full -translate-x-1/2"></div>

            <div className="space-y-6 sm:space-y-8">
              {journeyMilestones.map((item, index) => (
                <AnimatedTimelineItem key={item.step} item={item} isEven={index % 2 === 0} />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 4. Horizontal Testimonials Slider Section */}
      <TestimonialsSection />

      {/* 5. Frequently Asked Questions (FAQ) Section (BELOW Testimonials) */}
      <FaqSection />

      {/* 6. Contact Us Section (Boxed Card Container BELOW FAQ) */}
      <ContactSection />

      {/* Side Floating Widget for UG Notice (Persisted in localStorage) */}
      {!isUgNoticeDismissed && (
        <div className="fixed bottom-6 right-6 z-40 bg-navy/95 border-2 border-saffron/80 text-white rounded-2xl shadow-2xl p-3.5 max-w-xs flex items-center justify-between gap-3 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="text-base">🎓</span>
            <div>
              <p className="font-extrabold text-saffron leading-tight">UG Students Only</p>
              <p className="text-[11px] text-white/90 leading-tight mt-0.5">
                Program strictly for Under Graduate college students.
              </p>
            </div>
          </div>
          <button
            onClick={handleDismissUgNotice}
            className="text-xs font-bold text-gray-400 hover:text-white bg-white/10 hover:bg-white/20 px-2 py-1 rounded-lg transition-colors"
            title="Dismiss & Never Show Again"
            aria-label="Dismiss Notice"
          >
            ✕
          </button>
        </div>
      )}

      {/* Poster Lightbox / Modal */}
      {selectedPoster && (
        <div
          className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedPoster(null)}
        >
          <div
            className="bg-white rounded-3xl p-4 sm:p-6 max-w-md w-full shadow-2xl relative animate-in zoom-in-95 duration-200 border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPoster(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-100 hover:bg-red-50 hover:text-red-600 font-bold text-sm flex items-center justify-center transition-colors shadow-xs"
              aria-label="Close Preview"
            >
              ✕
            </button>
            <div className="rounded-2xl overflow-hidden border border-gray-200 mb-3 bg-gray-50 flex items-center justify-center shadow-inner">
              <img
                src={selectedPoster.url}
                alt={selectedPoster.title}
                className="w-full max-h-[68vh] object-contain"
              />
            </div>
            <div className="text-center space-y-1">
              <span className="text-[11px] font-extrabold text-saffron uppercase tracking-wide bg-saffron/10 px-2.5 py-0.5 rounded-full border border-saffron/30">
                {selectedPoster.tag}
              </span>
              <h3 className="text-sm sm:text-base font-extrabold text-navy">
                {selectedPoster.title}
              </h3>
              <p className="text-xs text-gray-600 font-medium">
                {selectedPoster.subtitle}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
