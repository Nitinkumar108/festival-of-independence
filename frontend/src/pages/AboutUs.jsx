import { useState } from "react";
import { Link } from "react-router-dom";

export default function AboutUs() {
  const [activePillar, setActivePillar] = useState(1);

  return (
    <div className="w-full min-h-screen bg-white text-slate-800 font-sans overflow-x-hidden">
      
      {/* 1. HERO HEADER BANNER WITH LOGOS & PURPOSE & LEGACY */}
      <section className="relative bg-navy text-white pt-6 sm:pt-8 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Image with Dark Navy Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80"
            alt="About Us Campus Header"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/95 via-navy/90 to-navy/95"></div>
        </div>

        <div className="w-full max-w-[1400px] mx-auto relative z-10">
          
          {/* Top-Aligned Flex Layout: Top Left | Center | Top Right */}
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 lg:gap-6">
            
            {/* TOP EXTREME LEFT: Circular ISKCON Kolkata Logo + Text */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-1 min-w-[170px] sm:min-w-[190px]">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-saffron/90 shadow-xl overflow-hidden bg-white p-1.5 flex items-center justify-center">
                <img
                  src="/iskcon_kolkata_logo.png"
                  alt="ISKCON Kolkata Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="font-extrabold text-saffron text-xs sm:text-sm tracking-wide pt-0.5">
                ISKCON Youth Forum
              </h3>
              <p className="text-[10px] sm:text-[11px] text-white/80 font-medium leading-tight max-w-[180px]">
                Youth wing of International Society for Krishna Consciousness
              </p>
            </div>

            {/* CENTER: OUR PURPOSE & LEGACY */}
            <div className="max-w-2xl text-center space-y-3 pt-2 md:pt-0">
              <span className="inline-flex items-center gap-2 bg-saffron/20 text-saffron font-extrabold text-xs px-4 py-1 rounded-full border border-saffron/40 shadow-sm backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-saffron animate-pulse"></span>
                Our Purpose & Legacy
              </span>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Our Purpose, Legacy & <span className="text-saffron">Philosophy</span>
              </h1>

              <p className="text-xs sm:text-base text-gray-200 font-medium leading-relaxed px-2">
                For over two decades, ISKCON Youth Forum (IYF Kolkata) has been nurturing India's youth across premier academic institutions with character, resilience, and timeless values.
              </p>

              <div className="pt-1 flex flex-wrap justify-center gap-2 text-xs font-bold">
                <span className="bg-white/10 text-white px-3.5 py-1.5 rounded-xl border border-white/20 backdrop-blur-md shadow-xs">
                  🏛️ 20+ Years Serving Youth
                </span>
                <span className="bg-white/10 text-saffron px-3.5 py-1.5 rounded-xl border border-saffron/30 backdrop-blur-md shadow-xs">
                  📖 Aligned with NEP 2020
                </span>
                <span className="bg-white/10 text-emerald-400 px-3.5 py-1.5 rounded-xl border border-emerald-400/30 backdrop-blur-md shadow-xs">
                  🌳 Aligned with Indian Knowledge System
                </span>
              </div>
            </div>

            {/* TOP EXTREME RIGHT: Circular Prabhupada Photo + Text */}
            <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-1 min-w-[170px] sm:min-w-[190px]">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-saffron/90 shadow-xl overflow-hidden bg-white/10">
                <img
                  src="/prabhupada_portrait.png"
                  alt="His Divine Grace A.C. Bhaktivedanta Swami Srila Prabhupada"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <h3 className="font-extrabold text-saffron text-xs sm:text-sm tracking-wide pt-0.5">
                Founder Acharya:
              </h3>
              <p className="text-[10px] sm:text-[11px] text-white/90 font-bold leading-tight max-w-[180px]">
                His Divine Grace A.C. Bhaktivedanta Swami Srila Prabhupada
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 4 OVERLAPPING PHOTO CARDS GRID */}
      <section className="px-4 sm:px-6 max-w-6xl mx-auto relative z-20 -mt-14 sm:-mt-20 mb-14 sm:mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
          
          <div className="h-44 sm:h-56 rounded-3xl overflow-hidden shadow-lg border-4 border-white bg-amber-50 group hover:scale-105 transition-transform duration-300">
            <img
              src="/about/about_front_1.jpg"
              alt="IYF College Seminar & Classroom Session"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          <div className="h-44 sm:h-56 rounded-3xl overflow-hidden shadow-lg border-4 border-white bg-blue-50 group hover:scale-105 transition-transform duration-300">
            <img
              src="/about/about_front_2.jpg"
              alt="Youth Spiritual & Cultural Heritage Retreat"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          <div className="h-44 sm:h-56 rounded-3xl overflow-hidden shadow-lg border-4 border-white bg-amber-50 group hover:scale-105 transition-transform duration-300">
            <img
              src="/about/about_front_3.jpg"
              alt="Students at Srila Prabhupada Pavilion"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          <div className="h-44 sm:h-56 rounded-3xl overflow-hidden shadow-lg border-4 border-white bg-blue-50 group hover:scale-105 transition-transform duration-300">
            <img
              src="/about/about_front_4.jpg"
              alt="Youth Convention & Festival Gathering"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

        </div>
      </section>

      {/* 2. MAIN ORGANIZATIONAL HERITAGE SECTIONS (SIDE-BY-SIDE CARDS WITH IMAGES & SAFFRON THEME) */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto space-y-16 sm:space-y-24">
          
          {/* SECTION 1: ABOUT ISKCON (Photo Left | Content Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            
            {/* Left Photo Composition with Overlapping Badge */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-100 bg-amber-50 group">
                <img
                  src="/about/iskcon_global.png"
                  alt="About ISKCON Global Movement"
                  className="w-full h-[320px] sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent"></div>
              </div>

              {/* Overlapping Floating Saffron Stat Badge (Reference style) */}
              <div className="absolute -bottom-5 -right-2 sm:bottom-6 sm:-right-6 bg-saffron text-navy rounded-2xl p-4 sm:p-5 shadow-2xl border-2 border-white max-w-[220px] sm:max-w-[250px] transition-transform hover:scale-105">
                <div className="flex items-center gap-3">
                  <span className="text-2xl sm:text-3xl font-black">700+</span>
                  <div className="text-[11px] sm:text-xs font-extrabold uppercase leading-tight">
                    Major Centers & Temples Worldwide
                  </div>
                </div>
              </div>

              {/* Top-Left Floating Badge */}
              <div className="absolute top-4 left-4 bg-navy/95 text-white px-3.5 py-1.5 rounded-full text-xs font-bold border border-saffron/40 shadow-lg backdrop-blur-md">
                🌐 Global Spiritual Movement
              </div>
            </div>

            {/* Right Text Content */}
            <div className="lg:col-span-6 space-y-4">
              <span className="inline-flex items-center gap-2 bg-saffron/10 text-saffron font-extrabold text-xs px-3.5 py-1 rounded-full border border-saffron/30">
                <span className="w-2 h-2 rounded-full bg-saffron animate-pulse"></span>
                About ISKCON
              </span>

              <h2 className="text-2xl sm:text-4xl font-black text-navy leading-snug">
                The International Society for <span className="text-saffron">Krishna Consciousness</span>
              </h2>

              <div className="space-y-3 text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
                <p>
                  The International Society for Krishna Consciousness (ISKCON), otherwise known as the Hare Krishna movement, includes 700+ major centers, temples and rural communities, 110+ affiliated vegetarian restaurants, thousands of namahattas or local meeting groups, a wide variety of community projects, and millions of congregational members worldwide. ISKCON has expanded widely since its founding by His Divine Grace A. C. Bhaktivedanta Swami Prabhupāda in New York City in 1966.
                </p>
                <p>
                  ISKCON belongs to the Gaudiya-Vaishnava sampradāya, a monotheistic tradition within the Vedic or Hindu culture. Philosophically it is based on the Sanskrit texts Bhagavad-gītā and the Bhagavat Purana, or Srimad Bhagavatam. These are the historic texts of the devotional bhakti yoga tradition, which teaches that the ultimate goal for all living beings is to reawaken their love for God, or Lord Krishna, the “all-attractive one”.
                </p>
              </div>

              {/* Checkmark Feature List (Matching Reference) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs font-bold text-navy">
                <div className="flex items-center gap-2 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                  <span className="w-5 h-5 rounded-full bg-saffron text-navy flex items-center justify-center text-xs font-black">✓</span>
                  <span>Gauḍīya-Vaiṣṇava Tradition</span>
                </div>
                <div className="flex items-center gap-2 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                  <span className="w-5 h-5 rounded-full bg-saffron text-navy flex items-center justify-center text-xs font-black">✓</span>
                  <span>Bhagavad-gītā Wisdom</span>
                </div>
                <div className="flex items-center gap-2 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                  <span className="w-5 h-5 rounded-full bg-saffron text-navy flex items-center justify-center text-xs font-black">✓</span>
                  <span>Śrīmad-Bhāgavatam</span>
                </div>
                <div className="flex items-center gap-2 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                  <span className="w-5 h-5 rounded-full bg-saffron text-navy flex items-center justify-center text-xs font-black">✓</span>
                  <span>Bhakti Yoga Path</span>
                </div>
              </div>
            </div>

          </div>

          {/* COUNTER STATS BAR (Matching Reference Image Dark Green/Saffron Bar) */}
          <div className="bg-gradient-to-r from-navy via-slate-900 to-navy text-white rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-saffron/40">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              
              <div className="space-y-1">
                <div className="text-3xl sm:text-5xl font-black text-saffron">700+</div>
                <p className="text-xs sm:text-sm font-bold text-gray-200 uppercase tracking-wider">
                  Global Centers & Temples
                </p>
              </div>

              <div className="space-y-1">
                <div className="text-3xl sm:text-5xl font-black text-saffron">110+</div>
                <p className="text-xs sm:text-sm font-bold text-gray-200 uppercase tracking-wider">
                  Govinda's Restaurants
                </p>
              </div>

              <div className="space-y-1">
                <div className="text-3xl sm:text-5xl font-black text-saffron">1971</div>
                <p className="text-xs sm:text-sm font-bold text-gray-200 uppercase tracking-wider">
                  First India Center (Kolkata)
                </p>
              </div>

              <div className="space-y-1">
                <div className="text-3xl sm:text-5xl font-black text-saffron">20+</div>
                <p className="text-xs sm:text-sm font-bold text-gray-200 uppercase tracking-wider">
                  Years Serving Youth
                </p>
              </div>

            </div>
          </div>

          {/* SECTION 2: ABOUT ISKCON KOLKATA (Content Left | Photo Right - Alternating Layout) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            
            {/* Left Text Content */}
            <div className="lg:col-span-6 space-y-4 order-2 lg:order-1">
              <span className="inline-flex items-center gap-2 bg-saffron/10 text-saffron font-extrabold text-xs px-3.5 py-1 rounded-full border border-saffron/30">
                <span className="w-2 h-2 rounded-full bg-saffron animate-pulse"></span>
                About ISKCON Kolkata
              </span>

              <h2 className="text-2xl sm:text-4xl font-black text-navy leading-snug">
                First ISKCON Center in India <span className="text-saffron">(Est. May 23, 1971)</span>
              </h2>

              <div className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
                <p>
                  After establishing many temples all over the world, Srila A.C. Bhaktivedanta Swami Prabhupada returned to India in August 1970. He established ISKCON’s first center in India in Kolkata on 23rd May, 1971 at 3C Albert Road, Kolkata – 700017. He came to Kolkata along with his foreign disciples. Shaven – headed Westerners, with sikhas, Vaisnava tilaka, saffron robes, playing mrdangas and karatalas, chanting Hare Krishna, quoting Sanskrit verses eloquently created sensation in Kolkata.
                </p>
              </div>

              {/* Checkmark Feature List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs font-bold text-navy">
                <div className="flex items-center gap-2 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                  <span className="w-5 h-5 rounded-full bg-saffron text-navy flex items-center justify-center text-xs font-black">✓</span>
                  <span>Est. 23rd May, 1971</span>
                </div>
                <div className="flex items-center gap-2 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                  <span className="w-5 h-5 rounded-full bg-saffron text-navy flex items-center justify-center text-xs font-black">✓</span>
                  <span>3C Albert Road, Kolkata</span>
                </div>
                <div className="flex items-center gap-2 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                  <span className="w-5 h-5 rounded-full bg-saffron text-navy flex items-center justify-center text-xs font-black">✓</span>
                  <span>Founded by Srila Prabhupada</span>
                </div>
                <div className="flex items-center gap-2 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                  <span className="w-5 h-5 rounded-full bg-saffron text-navy flex items-center justify-center text-xs font-black">✓</span>
                  <span>One of the Spiritual Centres of Kolkata</span>
                </div>
              </div>
            </div>

            {/* Right Photo Composition with Overlapping Badge */}
            <div className="lg:col-span-6 relative order-1 lg:order-2">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-100 bg-amber-50 group">
                <img
                  src="/about/iskcon_kolkata.png"
                  alt="ISKCON Kolkata Albert Road Center"
                  className="w-full h-[320px] sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent"></div>
              </div>

              {/* Overlapping Floating Badge */}
              <div className="absolute -bottom-5 -left-2 sm:bottom-6 sm:-left-6 bg-navy text-white rounded-2xl p-4 sm:p-5 shadow-2xl border-2 border-saffron max-w-[240px] sm:max-w-[270px] transition-transform hover:scale-105">
                <div className="flex items-center gap-3">
                  <span className="text-2xl sm:text-3xl">📍</span>
                  <div className="text-[11px] sm:text-xs font-bold text-gray-200 leading-snug">
                    <strong className="text-saffron block text-xs sm:text-sm">3C Albert Road</strong>
                    Kolkata – 700017, West Bengal
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* SECTION 3: ABOUT ISKCON YOUTH FORUM (Photo Left | Content Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            
            {/* Left Photo Composition with Overlapping Badge */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-100 bg-amber-50 group">
                <img
                  src="/about/iyf_learning.png"
                  alt="ISKCON Youth Forum Seminar Learning"
                  className="w-full h-[320px] sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent"></div>
              </div>

              {/* Overlapping Floating Badge */}
              <div className="absolute -bottom-5 -right-2 sm:bottom-6 sm:-right-6 bg-saffron text-navy rounded-2xl p-4 sm:p-5 shadow-2xl border-2 border-white max-w-[230px] sm:max-w-[260px] transition-transform hover:scale-105">
                <div className="flex items-center gap-3">
                  <span className="text-2xl sm:text-3xl font-black">20+</span>
                  <div className="text-[11px] sm:text-xs font-extrabold uppercase leading-tight">
                    Years Nurturing & Guiding College Youth
                  </div>
                </div>
              </div>

              {/* Top-Left Floating Badge */}
              <div className="absolute top-4 left-4 bg-navy/95 text-white px-3.5 py-1.5 rounded-full text-xs font-bold border border-saffron/40 shadow-lg backdrop-blur-md">
                🎓 Youth Empowerment Wing
              </div>
            </div>

            {/* Right Text Content */}
            <div className="lg:col-span-6 space-y-4">
              <span className="inline-flex items-center gap-2 bg-saffron/10 text-saffron font-extrabold text-xs px-3.5 py-1 rounded-full border border-saffron/30">
                <span className="w-2 h-2 rounded-full bg-saffron animate-pulse"></span>
                About ISKCON Youth Forum
              </span>

              <h2 className="text-2xl sm:text-4xl font-black text-navy leading-snug">
                Empowering Youth with <span className="text-saffron">Character & Clarity</span>
              </h2>

              <div className="space-y-3 text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
                <p>
                  ISKCON Youth Forum (IYF Kolkata) is the dedicated youth wing of ISKCON Kolkata, empowering undergraduate college students with character, emotional resilience, mind management, and timeless leadership values.
                </p>
                <p>
                  Through value-education courses, retreats, conventions, and campus outreach aligned with NEP 2020 and Indian Knowledge Systems (IKS), IYF Kolkata nurtures youth to become responsible, value-driven leaders of tomorrow.
                </p>
              </div>

              {/* Checkmark Feature List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs font-bold text-navy">
                <div className="flex items-center gap-2 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                  <span className="w-5 h-5 rounded-full bg-saffron text-navy flex items-center justify-center text-xs font-black">✓</span>
                  <span>NEP 2020 Aligned</span>
                </div>
                <div className="flex items-center gap-2 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                  <span className="w-5 h-5 rounded-full bg-saffron text-navy flex items-center justify-center text-xs font-black">✓</span>
                  <span>Aligned with Indian Knowledge System</span>
                </div>
                <div className="flex items-center gap-2 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                  <span className="w-5 h-5 rounded-full bg-saffron text-navy flex items-center justify-center text-xs font-black">✓</span>
                  <span>Value Education Courses</span>
                </div>
                <div className="flex items-center gap-2 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                  <span className="w-5 h-5 rounded-full bg-saffron text-navy flex items-center justify-center text-xs font-black">✓</span>
                  <span>Retreats & Conventions</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 bg-saffron text-navy font-black text-xs sm:text-sm px-6 py-3.5 rounded-2xl hover:bg-navy hover:text-white transition-all shadow-md hover:shadow-lg"
                >
                  <span>Join IYF Programs (UG Students)</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. THE 3 PHILOSOPHICAL PILLARS (Clear Cards in Saffron & Light Blue) */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/60 border-b border-gray-100">
        <div className="max-w-5xl mx-auto space-y-10">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-saffron font-bold text-xs uppercase tracking-wider bg-saffron/10 px-3.5 py-1 rounded-full border border-saffron/20">
              Festival of Independence
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-navy tracking-tight">
              The 3 Philosophical Pillars of Real Freedom
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              Explore the foundational principles of the Festival of Independence
            </p>
          </div>

          {/* Interactive Pillars Switcher Tabs */}
          <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
            <button
              onClick={() => setActivePillar(1)}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-300 ${
                activePillar === 1
                  ? "bg-yellow-400 text-navy shadow-md scale-105 ring-2 ring-yellow-400/50"
                  : "bg-white text-gray-600 hover:bg-yellow-100 border border-yellow-300"
              }`}
            >
              1. Independence of SELF
            </button>

            <button
              onClick={() => setActivePillar(2)}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-300 ${
                activePillar === 2
                  ? "bg-blue-600 text-white shadow-md scale-105"
                  : "bg-white text-gray-600 hover:bg-blue-50 border border-blue-200"
              }`}
            >
              2. Independence of THOUGHT
            </button>

            <button
              onClick={() => setActivePillar(3)}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-300 ${
                activePillar === 3
                  ? "bg-indiagreen text-white shadow-md scale-105"
                  : "bg-white text-gray-600 hover:bg-emerald-50 border border-emerald-200"
              }`}
            >
              3. Independence of CULTURE
            </button>
          </div>

          {/* PILLAR 1: INDEPENDENCE OF SELF CARD (YELLOW THEME) */}
          {activePillar === 1 && (
            <div className="bg-yellow-50/90 border-2 border-yellow-400/80 rounded-3xl p-6 sm:p-10 shadow-md space-y-6 transition-all">
              <div className="flex items-center gap-4 border-b border-yellow-300/80 pb-4">
                <div className="w-12 h-12 rounded-2xl bg-yellow-400 text-navy font-black flex items-center justify-center text-xl shadow-xs flex-shrink-0">
                  🧠
                </div>
                <div>
                  <span className="text-xs font-black text-amber-900 bg-yellow-200/80 px-2.5 py-0.5 rounded-full uppercase tracking-wider">Poster 3 Insight</span>
                  <h3 className="text-xl sm:text-3xl font-black text-navy mt-1">1. Independence of SELF</h3>
                  <p className="text-xs sm:text-sm text-amber-950 font-medium">Knowing the truth: "I am not the body; I am a spirit soul."</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-2xl border border-emerald-200/90 shadow-2xs space-y-3">
                  <h4 className="font-extrabold text-emerald-800 text-xs sm:text-sm flex items-center gap-2">
                    <span>✅</span> What I CAN Control:
                  </h4>
                  <ul className="text-xs sm:text-sm text-gray-700 space-y-2 list-disc list-inside font-medium leading-relaxed">
                    <li>My addictions & social media usage</li>
                    <li>My habits, routine & lifestyle choices</li>
                    <li>My attitude, reactions & spiritual practice</li>
                    <li>How I use my time & energy</li>
                  </ul>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-red-200/90 shadow-2xs space-y-3">
                  <h4 className="font-extrabold text-red-800 text-xs sm:text-sm flex items-center gap-2">
                    <span>❌</span> What I CANNOT Control:
                  </h4>
                  <ul className="text-xs sm:text-sm text-gray-700 space-y-2 list-disc list-inside font-medium leading-relaxed">
                    <li>My birth, parents & natural talents</li>
                    <li>Other people's thoughts & actions</li>
                    <li>Past actions (Karma) & natural events</li>
                    <li>Laws of nature & ultimate outcomes</li>
                  </ul>
                </div>
              </div>

              <div className="bg-amber-100/90 p-4 sm:p-5 rounded-2xl border border-yellow-300 text-center space-y-1 shadow-2xs">
                <p className="text-xs font-black text-amber-900 uppercase tracking-wider">Bhagavad-Gita 3.27 Wisdom</p>
                <p className="text-xs sm:text-sm text-navy font-bold italic">
                  "Real independence is not to be independent... but the freedom to voluntarily depend on higher wisdom and truth."
                </p>
              </div>
            </div>
          )}

          {/* PILLAR 2: INDEPENDENCE OF THOUGHT CARD */}
          {activePillar === 2 && (
            <div className="bg-blue-50/70 border border-blue-200 rounded-3xl p-6 sm:p-10 shadow-md space-y-6 transition-all">
              <div className="flex items-center gap-4 border-b border-blue-200 pb-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-black flex items-center justify-center text-xl shadow-xs flex-shrink-0">
                  💡
                </div>
                <div>
                  <span className="text-xs font-extrabold text-blue-700 uppercase tracking-wider">Poster 4 Insight</span>
                  <h3 className="text-xl sm:text-3xl font-extrabold text-navy mt-0.5">2. Independence of THOUGHT</h3>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">Choose Clarity over Confusion • Choose Truth over Trends</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-3">
                  <h4 className="font-extrabold text-navy text-xs sm:text-sm">Who is influencing your mind?</h4>
                  <div className="space-y-3 text-xs sm:text-sm font-medium">
                    <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
                      <strong className="text-red-700 block mb-1">Trends & Social Media:</strong>
                      Leads to self-centeredness, distraction, and superficial desires.
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-blue-200 shadow-2xs">
                      <strong className="text-blue-700 block mb-1">Scriptural Wisdom:</strong>
                      Guides higher intelligence (<em>Buddhi</em>) towards clarity & discernment (<em>Viveka</em>).
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-blue-200 shadow-2xs text-center space-y-2">
                  <p className="text-xs sm:text-sm font-bold text-navy leading-relaxed">
                    अयं निजः परो वेति गणना लघुचेतसाम् ।<br />
                    उदारचरितानां तु वसुधैव कुटुम्बकम् ॥
                  </p>
                  <p className="text-xs text-gray-600 italic leading-relaxed pt-2 border-t border-gray-100">
                    "This is mine and that is yours — such thinking belongs to narrow minds. To the broad-hearted, the entire world is one family."
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* PILLAR 3: INDEPENDENCE OF CULTURE CARD */}
          {activePillar === 3 && (
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-3xl p-6 sm:p-10 shadow-md space-y-6 transition-all">
              <div className="flex items-center gap-4 border-b border-emerald-200 pb-4">
                <div className="w-12 h-12 rounded-2xl bg-indiagreen text-white font-black flex items-center justify-center text-xl shadow-xs flex-shrink-0">
                  🌱
                </div>
                <div>
                  <span className="text-xs font-extrabold text-indiagreen uppercase tracking-wider">Poster 5 Insight</span>
                  <h3 className="text-xl sm:text-3xl font-extrabold text-navy mt-0.5">3. Independence of CULTURE</h3>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">Where imitation ends, true identity begins</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm font-medium">
                <div className="bg-white p-5 rounded-2xl border border-red-200 shadow-2xs space-y-2">
                  <h4 className="font-extrabold text-red-800 text-xs sm:text-sm">❌ Blind Imitation</h4>
                  <p className="text-gray-700 leading-relaxed">
                    "I want to live like others simply because it looks attractive or trending, abandoning my roots."
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-2xs space-y-2">
                  <h4 className="font-extrabold text-emerald-800 text-xs sm:text-sm">✅ Cultural Independence</h4>
                  <p className="text-gray-700 leading-relaxed">
                    "I respect all cultures, but I understand my own roots, heritage, and choose wisely."
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-emerald-200 text-center shadow-2xs">
                <p className="text-xs sm:text-sm font-extrabold text-indiagreen">
                  "Real cultural independence is having the wisdom to preserve what nourishes the soul."
                </p>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 4. CALL TO ACTION BANNER */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 text-center bg-white">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-navy via-slate-900 to-navy text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-5">
          <span className="text-saffron font-extrabold text-xs uppercase tracking-wider bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
            Join the Movement
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Begin Your Transformation?
          </h2>
          <p className="text-xs sm:text-sm text-gray-200 max-w-xl mx-auto font-medium leading-relaxed">
            Participate in the 1-Year Journey with 7 milestones. Strictly for Under Graduate college students.
          </p>
          <div className="pt-2 flex justify-center">
            <Link
              to="/register"
              className="bg-saffron text-navy font-black text-xs sm:text-sm px-8 py-4 rounded-2xl hover:bg-white hover:text-navy transition-all shadow-lg flex items-center gap-2"
            >
              <span>Register Now (UG Students)</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
