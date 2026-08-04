import { useState } from "react";
import { Link } from "react-router-dom";

export default function AboutUs() {
  const [activePillar, setActivePillar] = useState(1);

  return (
    <div className="w-full min-h-screen bg-white text-slate-800 font-sans overflow-x-hidden">
      
      {/* 1. HERO HEADER BANNER WITH BACKGROUND IMAGE */}
      <section className="relative bg-navy text-white pt-14 sm:pt-20 pb-24 sm:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden text-center">
        {/* Background Image with Dark Navy Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80"
            alt="About Us Campus Header"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/85 to-navy/95 backdrop-blur-[1px]"></div>
        </div>

        <div className="max-w-4xl mx-auto space-y-5 relative z-10">
          <span className="inline-flex items-center gap-2 bg-saffron/20 text-saffron font-extrabold text-xs px-4 py-1.5 rounded-full border border-saffron/40 shadow-sm backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-saffron animate-pulse"></span>
            About ISKCON Youth Forum (IYF Kolkata)
          </span>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Our Purpose, Legacy & <span className="text-saffron">Philosophy</span>
          </h1>

          <p className="text-xs sm:text-base text-gray-200 font-medium max-w-2xl mx-auto leading-relaxed">
            For over two decades, IYF Kolkata has been nurturing India's youth across premier academic institutions with character, resilience, and timeless values.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-2.5 text-xs font-bold">
            <span className="bg-white/10 text-white px-4 py-2 rounded-2xl border border-white/20 backdrop-blur-md shadow-xs">
              🏛️ 20+ Years Serving Youth
            </span>
            <span className="bg-white/10 text-saffron px-4 py-2 rounded-2xl border border-saffron/30 backdrop-blur-md shadow-xs">
              📖 Aligned with NEP 2020
            </span>
            <span className="bg-white/10 text-emerald-400 px-4 py-2 rounded-2xl border border-emerald-400/30 backdrop-blur-md shadow-xs">
              🌳 Indian Knowledge Systems (IKS)
            </span>
          </div>
        </div>
      </section>

      {/* 4 OVERLAPPING PHOTO CARDS GRID */}
      <section className="px-4 sm:px-6 max-w-6xl mx-auto relative z-20 -mt-14 sm:-mt-20 mb-14 sm:mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
          
          <div className="h-44 sm:h-56 rounded-3xl overflow-hidden shadow-lg border-4 border-white bg-amber-50 group hover:scale-105 transition-transform duration-300">
            <img
              src="/about/youth_seminar.png"
              alt="Youth Seminar"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="h-44 sm:h-56 rounded-3xl overflow-hidden shadow-lg border-4 border-white bg-blue-50 group hover:scale-105 transition-transform duration-300">
            <img
              src="/about/student_collaboration.png"
              alt="Student Collaboration"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="h-44 sm:h-56 rounded-3xl overflow-hidden shadow-lg border-4 border-white bg-amber-50 group hover:scale-105 transition-transform duration-300">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
              alt="Campus Discussion"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="h-44 sm:h-56 rounded-3xl overflow-hidden shadow-lg border-4 border-white bg-blue-50 group hover:scale-105 transition-transform duration-300">
            <img
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80"
              alt="Youth Gathering"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </section>

      {/* 2. WHY WE STARTED (2 Saffron & Light Blue Styled Bento Cards) */}
      <section className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <div className="text-center space-y-2">
            <span className="text-saffron font-bold text-xs uppercase tracking-wider bg-saffron/10 px-3.5 py-1 rounded-full border border-saffron/20">
              Foundational Need
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-navy tracking-tight">
              Why We Started
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              Addressing the real challenges faced by students today
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-stretch">
            
            {/* Left Card: Soft Saffron Theme */}
            <div className="md:col-span-6 bg-amber-50/80 border border-saffron/30 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="inline-block text-xs font-extrabold text-red-600 bg-red-50 px-3.5 py-1 rounded-full border border-red-200">
                  A Growing Concern
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-navy leading-snug">
                  Academic Excellence Alone Is Not Enough
                </h3>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
                  Data shows student stress and mental health challenges have increased steadily over the past decade. Technical training without emotional grounding leaves youth vulnerable.
                </p>
              </div>

              <div className="bg-white/90 p-4 sm:p-5 rounded-2xl border border-amber-200 shadow-2xs">
                <p className="text-xs sm:text-sm font-extrabold text-navy italic leading-snug">
                  "How do we prepare students? Only for successful careers... or for a meaningful, resilient and responsible life?"
                </p>
                <p className="text-[11px] text-saffron font-bold pt-1.5">— IYF Educational Vision</p>
              </div>
            </div>

            {/* Right Card: Light Blue Theme */}
            <div className="md:col-span-6 bg-blue-50/80 border border-blue-200 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="inline-block text-xs font-extrabold text-blue-700 bg-blue-100 px-3.5 py-1 rounded-full border border-blue-300">
                  Nationwide Outreach
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-navy leading-snug">
                  Engaging Premier Institutions Across India
                </h3>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
                  Our youth seminars and leadership modules have guided students across premier technical institutes and state universities:
                </p>

                {/* Institution Badges */}
                <div className="flex flex-wrap gap-2 text-xs font-bold text-navy pt-1">
                  {["IIT Bombay", "IIT Delhi", "IIT Madras", "IIT Kharagpur", "NIT Trichy", "NIT Warangal", "IIEST Shibpur"].map((inst, i) => (
                    <span key={i} className="bg-white text-navy px-3 py-1.5 rounded-xl border border-blue-200 shadow-2xs">
                      {inst}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-blue-200/60">
                <p className="text-xs font-bold text-indiagreen flex flex-wrap gap-x-2 gap-y-1">
                  <span>• Character Development</span>
                  <span>• Emotional Well-Being</span>
                  <span>• Purpose & Clarity</span>
                </p>
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
              Core Philosophy
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
