import { useState } from "react";

const faqs = [
  {
    id: 1,
    q: "Who can register for the Festival of Independence programs?",
    a: "This program is specifically designed for Undergraduate (UG) college students. Any UG student interested in personal transformation, leadership development, and ancient wisdom is welcome to register.",
  },
  {
    id: 2,
    q: "Is there a registration fee?",
    a: "No, registration for the Festival of Independence program is completely free of cost. There are no hidden fees or charges.",
  },
  {
    id: 3,
    q: "How do I get my class/program joining link?",
    a: "Once logged in, your student dashboard shows the upcoming program schedule along with joining links, venue details, and notifications.",
  },
  {
    id: 4,
    q: "What is the 1-Year Journey program?",
    a: "The 1-Year Journey is a 7-milestone leadership & spiritual values program designed by IYF Kolkata to empower youth with character, clarity, competence, and compassion.",
  },
];

export default function FaqSection() {
  const [openId, setOpenId] = useState(1); // Default open first FAQ

  const toggleFaq = (id) => {
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  return (
    <section className="bg-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
      <div className="max-w-6xl mx-auto">
        
        {/* Modern 2-Column Grid Layout (Matching Nicepay Reference Design) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Left Column: Title & Description */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 bg-saffron/10 border border-saffron/20 px-3.5 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-saffron animate-pulse"></span>
              <span className="text-saffron font-bold text-xs tracking-wider uppercase">
                Frequently asked questions
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy tracking-tight leading-tight">
              Frequently asked <br className="hidden sm:inline" />
              <span className="text-saffron">questions</span>
            </h2>

            <p className="text-gray-500 text-sm sm:text-base font-medium leading-relaxed pt-1 max-w-md">
              Have questions about registration, eligibility, or the 1-Year Journey program? Find answers to commonly asked questions below.
            </p>
          </div>

          {/* Right Column: Interactive Modern Cards Accordion */}
          <div className="lg:col-span-7 space-y-4">
            {faqs.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className={`rounded-2xl transition-all duration-300 border ${
                    isOpen
                      ? "bg-slate-50/80 border-saffron/40 shadow-sm"
                      : "bg-gray-50/60 border-gray-200/80 hover:bg-slate-50/50 hover:border-gray-300"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(item.id)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none group"
                    aria-expanded={isOpen}
                  >
                    <span className="font-extrabold text-navy text-sm sm:text-base pr-4 leading-snug group-hover:text-saffron transition-colors">
                      {item.q}
                    </span>

                    {/* Circular Arrow Toggle Icon Button */}
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        isOpen
                          ? "bg-saffron text-white rotate-180 shadow-md"
                          : "bg-navy/10 text-navy group-hover:bg-saffron group-hover:text-white"
                      }`}
                    >
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </button>

                  {/* Accordion Answer Content */}
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 text-xs sm:text-sm text-gray-600 font-medium leading-relaxed border-t border-gray-200/60 mt-1">
                      <p className="pt-3">{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
