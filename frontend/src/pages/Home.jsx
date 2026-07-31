import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

const testimonials = [
  {
    id: 1,
    name: "Aarav Sharma",
    designation: "Student, IIEST Shibpur",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80",
    quote: "Attending the Festival of Independence by IYF Kolkata completely changed my perspective on our nation's spiritual heritage. The sessions on leadership and ethics were truly life-changing!"
  },
  {
    id: 2,
    name: "Priya Roy",
    designation: "Software Engineer, TCS Kolkata",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    quote: "An unforgettable blend of culture, patriotic zeal, and practical wisdom. IYF Kolkata empowers today's youth to lead purposeful lives while staying rooted in our rich Indian traditions."
  },
  {
    id: 3,
    name: "Rahul Banerjee",
    designation: "Final Year B.Tech, Jadavpur University",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    quote: "The energy and positivity at the festival were unmatched. The interactive workshops gave me clarity on balancing academic goals with inner peace and values."
  },
  {
    id: 4,
    name: "Sneha Ganguly",
    designation: "Research Scholar, Calcutta University",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    quote: "A brilliant initiative celebrating Bharat Varsha's heritage. The cultural performances and keynote discourses were thought-provoking and deeply inspiring."
  },
  {
    id: 5,
    name: "Vikramaditya Das",
    designation: "Data Analyst, Wipro",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    quote: "IYF Kolkata provides an incredible platform for youth to connect, learn, and grow. This festival instilled a strong sense of pride, responsibility, and national unity."
  },
  {
    id: 6,
    name: "Ananya Sen",
    designation: "Medical Student, RG Kar Medical College",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    quote: "The atmosphere was filled with joy, devotion, and patriotic pride. I met so many like-minded students striving for personal excellence and social harmony."
  },
  {
    id: 7,
    name: "Rohan Mukhopadhyay",
    designation: "Mechanical Engg, NIT Durgapur",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    quote: "From insightful discussions on ancient Indian sciences to vibrant cultural events, every moment of the festival was enriching. Highly recommended for every student!"
  },
  {
    id: 8,
    name: "Ishita Chakrabarti",
    designation: "Student, St. Xavier's College",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
    quote: "The Festival of Independence gave us a fresh lens to look at our roots. The team's hospitality and the speakers' wisdom made it a truly memorable experience."
  },
  {
    id: 9,
    name: "Devansh Verma",
    designation: "Entrepreneur & IYF Alumnus",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80",
    quote: "Participating in IYF events during college laid the foundation for my ethical leadership skills. This festival is a beacon of light for the younger generation."
  },
  {
    id: 10,
    name: "Tiyasa Bhowmick",
    designation: "PG Student, Heritage Institute of Tech",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    quote: "A wonderful celebration of our nation's 80th Independence Day! It helped me discover inner strength, focus, and a strong commitment to serving society."
  }
];

const heroImages = [
  "https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=1600&q=80", // Indian Flag flying proudly
  "https://images.unsplash.com/photo-1597047084897-51e81819a499?auto=format&fit=crop&w=1600&q=80", // Youth Tiranga celebration & marching
  "https://images.unsplash.com/photo-1569012871812-a3b6472ab07d?auto=format&fit=crop&w=1600&q=80", // Heritage & national pride monument
  "https://images.unsplash.com/photo-1605649487212-47bdab06cf6f?auto=format&fit=crop&w=1600&q=80", // Vibrant Indian cultural festival & youth gathering
  "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=80", // Iconic Indian sunrise & landscape over Bharat Varsha
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=80"  // Historic Indian monument in golden sunlight
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
    title: "LEVEL 1 COMPLETION WITH EXAM",
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

const faqs = [
  {
    q: "Who can register for the Festival of Independence programs?",
    a: "Any student or youth interested in participating is welcome to register through the website.",
  },
  {
    q: "Is there a registration fee?",
    a: "Yes, a nominal registration fee applies and can be paid securely online after logging in.",
  },
  {
    q: "How do I get my class/program joining link?",
    a: "Once logged in, your student dashboard shows the upcoming program schedule along with joining links or venue details.",
  },
  {
    q: "Is my payment information secure?",
    a: "Yes. All payments are processed through Razorpay; we never store your card details on our servers.",
  },
  {
    q: "What is the 1-Year Journey program?",
    a: "The 1-Year Journey is a 7-milestone leadership & spiritual values program designed by IYF Kolkata to empower Indian youth with character, clarity, competence, and compassion.",
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
            <p className="text-gray-600 text-xs leading-relaxed mb-2.5">
              {item.description}
            </p>

            <div className="flex flex-wrap gap-1">
              {item.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-[9px] font-medium text-gray-500 bg-white px-1.5 py-0.5 rounded border border-gray-100"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

export default function Home() {
  const { user, token, role } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [heroIndex, setHeroIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // UG Notice State (Persisted in localStorage so it never pops up again once closed)
  const [isUgNoticeDismissed, setIsUgNoticeDismissed] = useState(() => {
    return localStorage.getItem("ug_notice_dismissed") === "true";
  });

  function handleDismissUgNotice() {
    localStorage.setItem("ug_notice_dismissed", "true");
    setIsUgNoticeDismissed(true);
  }

  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [contactStatus, setContactStatus] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    const heroTimer = setInterval(() => {
      setHeroIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => {
      clearInterval(timer);
      clearInterval(heroTimer);
    };
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  function handleContactChange(e) {
    setContactForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleContactSubmit(e) {
    e.preventDefault();
    setContactStatus("sending");
    try {
      await api.post("/contact", contactForm);
      setContactStatus("sent");
      setContactForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setContactStatus("error");
    }
  }

  return (
    <div className="w-full min-h-screen overflow-x-hidden">

      {/* 1. Hero Section with Transparent Background Slideshow */}
      <section className="relative bg-navy text-white overflow-hidden py-16 sm:py-24 px-4">
        {/* Transparent Background Images Slideshow */}
        {heroImages.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${heroIndex === idx ? "opacity-65" : "opacity-0"
              }`}
          >
            <img
              src={img}
              alt="Festival of Independence Patriotic Youth"
              className="w-full h-full object-cover"
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
            IYF Kolkata presents on the 80th Independence Day of the Holy land of Bharat Varsha
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
            Festival of <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron via-white to-indiagreen">Independence</span>
          </h1>
          <p className="max-w-2xl mx-auto text-white/80 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed px-2">
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
            <Link
              to="/register"
              className="inline-block bg-saffron text-navy font-bold text-sm sm:text-base px-6 sm:px-8 py-3 rounded-full hover:bg-indiagreen hover:text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Register Now
            </Link>
          )}
        </div>

        {/* Hero Slideshow Indicator Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex space-x-1.5">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setHeroIndex(idx)}
              aria-label={`Go to hero slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${heroIndex === idx ? "w-5 bg-saffron" : "w-1.5 bg-white/40"
                }`}
            />
          ))}
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
              Let's build a Nation of{" "}
              <span className="text-saffron">Character</span>,{" "}
              <span className="text-indiagreen">Compassion</span> and{" "}
              <span className="text-navy">Consciousness</span>
            </h2>
          </div>

          {/* Card 1: Freedom Quote */}
          <div className="bg-white rounded-xl shadow-sm border border-amber-200 border-l-4 border-l-saffron p-4 sm:p-5 text-center transition-all hover:shadow-md">
            <p className="text-xs sm:text-sm md:text-base font-bold tracking-wide text-navy uppercase leading-relaxed">
              TRUE FREEDOM IS NOT JUST FROM A NATION,{" "}
              <span className="text-saffron">BUT FROM IGNORANCE</span>,{" "}
              <span className="text-saffron">FEAR</span> AND{" "}
              <span className="text-saffron">SELFISHNESS</span>.
            </p>
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
      <section className="bg-cream py-10 sm:py-16 px-4 overflow-hidden">
        <div className="max-w-3xl mx-auto">

          {/* Section Header */}
          <div className="text-center mb-6 sm:mb-8">
            <span className="text-saffron font-bold text-xs sm:text-sm tracking-wider uppercase bg-saffron/10 px-3.5 py-1 rounded-full">
              Voices of Inspiration
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy mt-2.5 px-2">
              What Youth Say About The Festival
            </h2>
            <div className="w-14 sm:w-16 h-1 bg-gradient-to-r from-saffron to-indiagreen mx-auto mt-2.5 rounded-full"></div>
          </div>

          {/* Slider Container with Touch Support */}
          <div
            className="relative"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="overflow-hidden rounded-2xl shadow-xl bg-white border border-gray-100 p-5 sm:p-8 md:p-10 transition-all duration-500">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((item) => (
                  <div
                    key={item.id}
                    className="w-full flex-shrink-0 flex flex-col items-center text-center px-2 sm:px-4"
                  >
                    <div className="relative mb-3 sm:mb-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-3 border-saffron shadow-md p-0.5 bg-white ring-2 ring-saffron/20"
                      />
                    </div>

                    <svg
                      className="w-6 h-6 sm:w-8 sm:h-8 text-saffron/30 mb-2"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                    >
                      <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2h0V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2h0V8z" />
                    </svg>

                    <p className="text-gray-700 text-xs sm:text-base md:text-lg italic mb-4 sm:mb-6 max-w-xl leading-relaxed font-medium px-1">
                      "{item.quote}"
                    </p>

                    <div className="flex flex-col items-center">
                      <h4 className="font-bold text-navy text-sm sm:text-lg mb-0.5">{item.name}</h4>
                      <p className="text-[11px] sm:text-sm text-indiagreen font-semibold">
                        {item.designation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Navigation Arrows */}
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="hidden sm:flex absolute left-2 md:-left-6 top-1/2 -translate-y-1/2 bg-white text-navy p-2.5 sm:p-3 rounded-full shadow-lg hover:bg-saffron hover:text-white transition-all duration-300 border border-gray-100 group"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="hidden sm:flex absolute right-2 md:-right-6 top-1/2 -translate-y-1/2 bg-white text-navy p-2.5 sm:p-3 rounded-full shadow-lg hover:bg-saffron hover:text-white transition-all duration-300 border border-gray-100 group"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation Buttons Row */}
          <div className="flex sm:hidden justify-between items-center px-2 mt-4">
            <button
              onClick={handlePrev}
              className="bg-white text-navy px-3.5 py-1.5 rounded-full shadow-sm border border-gray-200 text-xs font-bold flex items-center gap-1 active:scale-95 active:bg-saffron active:text-white transition-all"
            >
              ← Prev
            </button>
            <span className="text-[11px] text-gray-500 font-medium tracking-tight">
              Swipe or tap
            </span>
            <button
              onClick={handleNext}
              className="bg-white text-navy px-3.5 py-1.5 rounded-full shadow-sm border border-gray-200 text-xs font-bold flex items-center gap-1 active:scale-95 active:bg-saffron active:text-white transition-all"
            >
              Next →
            </button>
          </div>

          {/* Dots Indicator & Timer Bar */}
          <div className="flex flex-col items-center mt-4 sm:mt-6 space-y-2 sm:space-y-3">
            <div className="flex items-center space-x-1 sm:space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${currentIndex === index
                    ? "w-5 sm:w-8 bg-saffron"
                    : "w-2 sm:w-2.5 bg-gray-300 hover:bg-gray-400"
                    }`}
                />
              ))}
            </div>

            <p className="text-[11px] sm:text-xs text-gray-500 font-medium">
              {currentIndex + 1} of {testimonials.length} (Auto-slides every 5 seconds)
            </p>
          </div>

        </div>
      </section>

      {/* 5. Frequently Asked Questions (FAQ) Section (BELOW Testimonials) */}
      <section className="py-12 sm:py-16 px-4 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <span className="text-indiagreen font-bold text-xs tracking-wider uppercase bg-indiagreen/10 px-3.5 py-1 rounded-full inline-block mb-2">
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3.5">
            {faqs.map((item, i) => (
              <details key={i} className="border border-gray-200 rounded-xl p-4 sm:p-5 bg-white group hover:border-saffron/40 transition-colors">
                <summary className="font-bold text-navy text-sm sm:text-base cursor-pointer flex items-center justify-between">
                  <span>{item.q}</span>
                  <span className="text-saffron font-bold text-base transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="text-xs sm:text-sm text-gray-600 mt-3 pt-3 border-t border-gray-100 leading-relaxed">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Contact Us Section (Boxed Card Container BELOW FAQ) */}
      <section className="py-12 sm:py-16 px-4 bg-gradient-to-b from-cream/40 via-amber-50/20 to-cream/50 border-t border-amber-100">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-amber-200/80">
          <div className="text-center mb-8 sm:mb-10">
            <span className="text-saffron font-bold text-xs tracking-wider uppercase bg-saffron/10 px-3.5 py-1 rounded-full inline-block mb-2 border border-saffron/20">
              Get in Touch
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy">
              Contact ISKCON Youth Forum
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Have questions about the festival or registration? Send us a message below!
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6 sm:gap-8 bg-amber-50/40 p-6 sm:p-8 rounded-2xl border border-amber-100/90">
            {/* Contact Info Sidebar */}
            <div className="md:col-span-2 space-y-4 border-b md:border-b-0 md:border-r border-gray-100 pb-6 md:pb-0 md:pr-6">
              <h3 className="font-bold text-navy text-base sm:text-lg mb-3">Reach Out To Us</h3>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-gray-700">
                <span className="text-saffron text-base">📍</span>
                <div>
                  <p className="font-bold text-navy">Address</p>
                  <p className="text-gray-600">3C Albert Road, Near Minto Park, Kolkata 700017</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-gray-700">
                <span className="text-saffron text-base">📧</span>
                <div>
                  <p className="font-bold text-navy">Email</p>
                  <p className="text-gray-600">contact@iyfkolkata.org</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-gray-700">
                <span className="text-saffron text-base">📞</span>
                <div>
                  <p className="font-bold text-navy">Phone / WhatsApp</p>
                  <p className="text-gray-600">+91 98765 43210</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleContactSubmit} className="md:col-span-3 space-y-3.5">
              <input
                name="name"
                value={contactForm.name}
                onChange={handleContactChange}
                placeholder="Full Name"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-saffron"
              />
              <input
                type="email"
                name="email"
                value={contactForm.email}
                onChange={handleContactChange}
                placeholder="Email Address"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-saffron"
              />
              <input
                name="phone"
                value={contactForm.phone}
                onChange={handleContactChange}
                placeholder="Phone / WhatsApp Number (optional)"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-saffron"
              />
              <textarea
                name="message"
                value={contactForm.message}
                onChange={handleContactChange}
                placeholder="Write your query or message..."
                required
                rows={4}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-saffron"
              />
              <button
                type="submit"
                disabled={contactStatus === "sending"}
                className="w-full bg-saffron text-navy font-bold text-xs sm:text-sm py-3 rounded-xl hover:bg-indiagreen hover:text-white transition-all shadow-xs disabled:opacity-60"
              >
                {contactStatus === "sending" ? "Sending Message..." : "Send Message"}
              </button>

              {contactStatus === "sent" && (
                <p className="text-xs font-bold text-emerald-700 bg-emerald-50 p-2.5 rounded-lg text-center border border-emerald-200">
                  ✓ Message sent successfully! We will get back to you soon.
                </p>
              )}
              {contactStatus === "error" && (
                <p className="text-xs font-bold text-red-600 bg-red-50 p-2.5 rounded-lg text-center border border-red-200">
                  Failed to send message. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

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

    </div>
  );
}
