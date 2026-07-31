import { useState } from "react";
import { Link } from "react-router-dom";

export default function AboutUs() {
  const [activeDiscovery, setActiveDiscovery] = useState(1);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-amber-50/70 via-orange-50/30 to-amber-50/50 text-slate-800 overflow-x-hidden font-sans">
      
      {/* 1. HERO BANNER WITH SAFFRON STRUCTURE & PATRIOTIC VIBE */}
      <section className="relative py-14 sm:py-20 px-4 sm:px-6 overflow-hidden border-b border-amber-100">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-saffron/10 rounded-full blur-3xl -z-10 animate-pulse"></div>

        <div className="max-w-4xl mx-auto text-center space-y-5">
          <span className="inline-block bg-saffron/15 text-saffron font-extrabold text-xs px-4 py-1.5 rounded-full border border-saffron/30">
            About ISKCON Youth Forum (IYF Kolkata)
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-navy tracking-tight leading-tight">
            Our Purpose, Legacy & <span className="text-saffron">Philosophy</span>
          </h1>

          <p className="text-sm sm:text-base font-semibold text-gray-700 max-w-2xl mx-auto leading-relaxed">
            For over two decades, IYF Kolkata has been nurturing India's youth across premier academic institutions with character, resilience, and timeless values.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3 text-xs font-bold">
            <span className="bg-white text-navy px-4 py-2 rounded-xl border border-amber-200 shadow-2xs">
              🏛️ 20+ Years Serving Youth
            </span>
            <span className="bg-white text-saffron px-4 py-2 rounded-xl border border-amber-200 shadow-2xs">
              📖 Aligned with NEP 2020
            </span>
            <span className="bg-white text-indiagreen px-4 py-2 rounded-xl border border-amber-200 shadow-2xs">
              🌳 Indian Knowledge Systems (IKS)
            </span>
          </div>
        </div>
      </section>

      {/* 2. THE SOCIAL CONCERN & OUR NATIONWIDE IMPACT (Poster 2) */}
      <section className="py-14 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-10">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy">Why We Started</h2>
            <p className="text-xs sm:text-sm text-gray-600">Addressing the real challenges faced by students today</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            
            {/* Left Box: The Concern */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-amber-200/80 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-200">
                  A Growing Concern
                </span>
                <h3 className="text-xl font-extrabold text-navy">
                  Academic Excellence Alone Is Not Enough
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Data shows student stress and mental health challenges have increased steadily over the past decade. Technical training without emotional grounding leaves youth vulnerable.
                </p>
              </div>

              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200">
                <p className="text-xs font-extrabold text-navy leading-snug">
                  "How do we prepare students? Only for successful careers... or for a meaningful, resilient and responsible life?"
                </p>
              </div>
            </div>

            {/* Right Box: Impact Across Premier Institutions */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-amber-200/80 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-bold text-saffron bg-saffron/10 px-3 py-1 rounded-full border border-saffron/20">
                  Nationwide Presence
                </span>
                <h3 className="text-xl font-extrabold text-navy">
                  Engaging Premier Institutions Across India
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Our youth seminars and leadership modules have guided students across premier technical institutes and state universities:
                </p>

                {/* Institution Pills */}
                <div className="flex flex-wrap gap-2 text-xs font-bold text-navy pt-1">
                  <span className="bg-slate-100 px-3 py-1 rounded-xl">IIT Bombay</span>
                  <span className="bg-slate-100 px-3 py-1 rounded-xl">IIT Delhi</span>
                  <span className="bg-slate-100 px-3 py-1 rounded-xl">IIT Madras</span>
                  <span className="bg-slate-100 px-3 py-1 rounded-xl">IIT Kharagpur</span>
                  <span className="bg-slate-100 px-3 py-1 rounded-xl">NIT Trichy</span>
                  <span className="bg-slate-100 px-3 py-1 rounded-xl">NIT Warangal</span>
                  <span className="bg-slate-100 px-3 py-1 rounded-xl">IIEST Shibpur</span>
                </div>
              </div>

              <p className="text-xs font-bold text-indiagreen pt-2 border-t border-gray-100">
                Focus Areas: Character Development • Emotional Well-Being • Purpose & Clarity • Social Responsibility
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 3. THE 3 PHILOSOPHICAL DISCOVERIES OF REAL FREEDOM (Posters 3, 4 & 5) */}
      <section className="py-14 px-4 sm:px-6 bg-gradient-to-b from-amber-100/50 via-white to-amber-50/50 border-t border-amber-100">
        <div className="max-w-5xl mx-auto space-y-8">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy">The 3 Philosophical Pillars</h2>
            <p className="text-xs sm:text-sm text-gray-600">Explore the foundational principles of the Festival of Independence</p>
          </div>

          {/* Interactive Discovery Selector Tabs */}
          <div className="flex justify-center gap-2 sm:gap-4 flex-wrap">
            <button
              onClick={() => setActiveDiscovery(1)}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                activeDiscovery === 1
                  ? "bg-saffron text-navy shadow-md scale-105"
                  : "bg-white text-gray-600 hover:bg-amber-50 border border-amber-200"
              }`}
            >
              1. Independence of SELF
            </button>

            <button
              onClick={() => setActiveDiscovery(2)}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                activeDiscovery === 2
                  ? "bg-saffron text-navy shadow-md scale-105"
                  : "bg-white text-gray-600 hover:bg-amber-50 border border-amber-200"
              }`}
            >
              2. Independence of THOUGHT
            </button>

            <button
              onClick={() => setActiveDiscovery(3)}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                activeDiscovery === 3
                  ? "bg-saffron text-navy shadow-md scale-105"
                  : "bg-white text-gray-600 hover:bg-amber-50 border border-amber-200"
              }`}
            >
              3. Independence of CULTURE
            </button>
          </div>

          {/* DISCOVERY 1: SELF (Poster 3) */}
          {activeDiscovery === 1 && (
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-amber-200 space-y-6">
              <div className="border-b border-amber-100 pb-3">
                <span className="text-xs font-bold text-saffron uppercase tracking-wider">Poster 3 Insight</span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-navy mt-1">1. Independence of SELF</h3>
                <p className="text-xs sm:text-sm text-gray-600">Knowing the truth: "I am not the body; I am a spirit soul."</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200 space-y-2">
                  <h4 className="font-bold text-emerald-800 text-sm">✅ What I CAN Control:</h4>
                  <ul className="text-xs text-gray-700 space-y-1.5 list-disc list-inside font-medium">
                    <li>My addictions & social media usage</li>
                    <li>My habits, routine & lifestyle choices</li>
                    <li>My attitude, reactions & spiritual practice</li>
                    <li>How I use my time & energy</li>
                  </ul>
                </div>

                <div className="bg-red-50/70 p-5 rounded-2xl border border-red-200 space-y-2">
                  <h4 className="font-bold text-red-800 text-sm">❌ What I CANNOT Control:</h4>
                  <ul className="text-xs text-gray-700 space-y-1.5 list-disc list-inside font-medium">
                    <li>My birth, parents & natural talents</li>
                    <li>Other people's thoughts & actions</li>
                    <li>Past actions (Karma) & natural events</li>
                    <li>Laws of nature & ultimate outcomes</li>
                  </ul>
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-center space-y-1">
                <p className="text-xs font-bold text-saffron italic">Bhagavad-Gita 3.27 Wisdom</p>
                <p className="text-xs text-gray-700">
                  Real independence is not to be independent... but the freedom to voluntarily depend on higher wisdom and truth.
                </p>
              </div>
            </div>
          )}

          {/* DISCOVERY 2: THOUGHT (Poster 4) */}
          {activeDiscovery === 2 && (
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-amber-200 space-y-6">
              <div className="border-b border-amber-100 pb-3">
                <span className="text-xs font-bold text-saffron uppercase tracking-wider">Poster 4 Insight</span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-navy mt-1">2. Independence of THOUGHT</h3>
                <p className="text-xs sm:text-sm text-gray-600">Choose Clarity over Confusion • Choose Truth over Trends</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div className="space-y-3">
                  <h4 className="font-bold text-navy text-sm">Who is influencing your mind?</h4>
                  <div className="space-y-2 text-xs">
                    <p className="bg-gray-100 p-3 rounded-xl"><strong>Trends & Social Media:</strong> Leads to self-centeredness & distraction.</p>
                    <p className="bg-amber-50 p-3 rounded-xl border border-amber-200"><strong>Scriptural Wisdom:</strong> Guides higher intelligence (*Buddhi*) to discernment (*Viveka*).</p>
                  </div>
                </div>

                <div className="bg-cream p-5 rounded-2xl border border-amber-200 space-y-2 text-center">
                  <p className="text-xs font-bold text-navy">अयं निजः परो वेति गणना लघुचेतसाम् ।<br />उदारचरितानां तु वसुधैव कुटुम्बकम् ॥</p>
                  <p className="text-[11px] text-gray-600 italic">
                    "This is mine and that is yours — such thinking belongs to narrow minds. To the broad-hearted, the entire world is one family."
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* DISCOVERY 3: CULTURE (Poster 5) */}
          {activeDiscovery === 3 && (
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-amber-200 space-y-6">
              <div className="border-b border-amber-100 pb-3">
                <span className="text-xs font-bold text-saffron uppercase tracking-wider">Poster 5 Insight</span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-navy mt-1">3. Independence of CULTURE</h3>
                <p className="text-xs sm:text-sm text-gray-600">Where imitation ends, true identity begins</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 text-xs">
                <div className="bg-red-50/70 p-4 rounded-2xl border border-red-200">
                  <h4 className="font-bold text-red-700 text-sm mb-1.5">❌ Blind Imitation</h4>
                  <p className="text-gray-700">"I want to live like others simply because it looks attractive or trending."</p>
                </div>

                <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200">
                  <h4 className="font-bold text-emerald-700 text-sm mb-1.5">✅ Cultural Independence</h4>
                  <p className="text-gray-700">"I respect all cultures, but I understand my own roots, heritage and choose wisely."</p>
                </div>
              </div>

              <p className="text-center text-xs font-bold text-saffron">
                Real cultural independence is having the wisdom to preserve what nourishes the soul.
              </p>
            </div>
          )}

        </div>
      </section>

      {/* 4. JOIN US CTA */}
      <section className="py-14 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-navy via-slate-900 to-navy text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Explore Further
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 max-w-lg mx-auto">
            Ready to participate in the Festival of Independence? Register today for the 1-Year Journey!
          </p>
          <div className="pt-2 flex justify-center">
            <Link
              to="/register"
              className="bg-saffron text-navy font-bold text-xs sm:text-sm px-8 py-3 rounded-2xl hover:bg-saffron/90 transition-all shadow-sm"
            >
              Register Now (UG Students)
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
