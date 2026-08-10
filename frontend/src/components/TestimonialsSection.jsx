import { useState, useEffect } from "react";
import api from "../api/axios.js";

const DEFAULT_TESTIMONIALS = [
  {
    id: 1,
    name: "Aritra Hazra",
    designation: "HR, TATA Electronics",
    company: "MBA, IISWBM",
    image: "/testimonials/AritraHazra.jpg",
    headline: "LIFE TRANSFORMED FOR THE BETTER!",
    quote: "After taking this course, my life has transformed for the better. It gave a clarity of thought and a purpose. It showed me the way to stay undisturbed in potentially disturbing situations. The takeaways have helped me in my student as well professional life."
  },
  {
    id: 2,
    name: "Shibam Choudhury",
    designation: "MBBS 2nd Year Student",
    company: "IPGMER & SSKM Hospital",
    image: "/testimonials/Shibam.jpg",
    headline: "DISCIPLINE & EMOTIONAL RESILIENCE!",
    quote: "Alongside my MBBS studies, this journey has helped me develop discipline, focus, and emotional resilience. Far from being a distraction, it has improved my academic performance while giving me greater clarity, confidence, and purpose."
  },
  {
    id: 3,
    name: "Sayan Guha",
    designation: "CEO",
    company: "RG Medtech Pvt. Ltd.",
    image: "/testimonials/Sayan.jpg",
    headline: "LESSONS OF HUMILITY & SELFLESS SERVICE!",
    quote: "The lessons taught me discipline, humility and Selfless service. It inspired me to appreciate the importance of creating an ecosystem with the same shared values for everyone to work together with mutual respect and a common purpose to create a lasting change."
  },
  {
    id: 4,
    name: "Aditya Anand Singh",
    designation: "Professional Cricketer",
    company: "CAB Super Division",
    image: "/testimonials/Aditya.jpg",
    headline: "RISE ABOVE DAILY PRESSURES!",
    quote: "It helped me rise above daily pressures and focus on what truly matters. They strengthened my mind and awakened a deeper appreciation for the Divine, revealing a connection I had never recognized before."
  },
  {
    id: 5,
    name: "Subhojit Dhar",
    designation: "Manager, TATA Steel",
    company: "Gold Medalist, IIEST Shibpur",
    image: "/testimonials/subojit-pr.jpeg",
    headline: "GREATER CLARITY & DIRECTION IN LIFE!",
    quote: "This journey helped me gain greater clarity and direction in life. The practices and guidance encouraged me to stay grounded and gradually become less influenced by distractions, helping me focus more on what truly matters."
  },
  {
    id: 6,
    name: "Arup Rai",
    designation: "PADA Engr., Accenture",
    company: "B.Tech, B.P. Poddar University",
    image: "/testimonials/arup_rai.jpeg",
    headline: "CLEAR PURPOSE AND VISION!",
    quote: "The teachings of Vedic Scriptures gave me clear purpose and vision. Embracing selflessness, compassion, and equal vision helps me build inclusive, growth-oriented spaces, stay dedicated to excellence, and view failures as valuable lessons."
  },
  {
    id: 7,
    name: "Adarsh Singh",
    designation: "Software Engineer, CIMPRESS",
    company: "B.Tech, IIEST Shibpur",
    image: "/testimonials/Adarsh.jpg",
    headline: "BALANCED LIFE & POSITIVE MINDSET!",
    quote: "These sessions have helped me balance my academic, professional, and personal life while managing stress with a calm and positive mindset."
  },
  {
    id: 8,
    name: "Nitin Kr. Bais",
    designation: "IT System Analyst, Bandhan Bank",
    company: "B.Tech, IIEST Shibpur",
    image: "/testimonials/Nitin.jpg",
    headline: "INNER PEACE IN A FAST-PACED WORLD!",
    quote: "Spirituality has given me a balanced and focused life with a clear sense of purpose. It has helped me stay away from negativity, remain calm during challenges, and experience inner peace. I believe it is especially valuable for students in today's fast-paced world."
  },
  {
    id: 9,
    name: "Swamynath Chourasia",
    designation: "Accountant",
    company: "B.Com., Jaipuria College",
    image: "/testimonials/Swamynath.jpg",
    headline: "STRENGTHENED WISDOM & CHARACTER!",
    quote: "These sessions have helped me clearly see my goal in life and strive towards it with purpose and determination. They have strengthened my wisdom and character enabling me to make better decisions, stay focused during challenges, and become a more responsible and noble individual."
  },
  {
    id: 10,
    name: "Aritra Roy",
    designation: "Asst. Manager, HINDALCO",
    company: "Gold Medalist, IIEST Shibpur",
    image: "/testimonials/Aritra.jpg",
    headline: "SPACE TO DEEPLY INTROSPECT!",
    quote: "This course gave me the space to deeply introspect about life and taught me what it truly means to be a kind and responsible gentleman. It is where I learned to take responsibility and developed the soft skills that you often don't find within the four walls of a classroom."
  }
];

export default function TestimonialsSection() {
  const [items, setItems] = useState(DEFAULT_TESTIMONIALS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    api
      .get("/testimonials")
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setItems(res.data);
        }
      })
      .catch(() => {});
  }, []);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (items.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [items.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

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

  const activeIndex = items.length > 0 ? currentIndex % items.length : 0;

  return (
    <section className="bg-cream py-10 sm:py-16 px-3 sm:px-6 lg:px-8 overflow-hidden border-t border-amber-100">
      <div className="max-w-4xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-10">
          <span className="text-saffron font-bold text-[11px] sm:text-sm tracking-wider uppercase bg-saffron/10 px-3.5 py-1 rounded-full inline-block border border-saffron/20 mb-2">
            Voices of Transformation
          </span>
          <h2 className="text-xl sm:text-3xl font-extrabold text-navy tracking-tight px-2">
            What Youth Say About The Festival
          </h2>
          <div className="w-14 sm:w-16 h-1 bg-gradient-to-r from-saffron to-indiagreen mx-auto mt-2 sm:mt-2.5 rounded-full"></div>
        </div>

        {/* Responsive Carousel Slider Box */}
        <div
          className="relative max-w-3xl mx-auto"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Outer Viewport */}
          <div className="w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl bg-white border border-amber-200/90 transition-all duration-500">
            {/* Horizontal Track */}
            <div
              className="flex transition-transform duration-700 ease-in-out w-full"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {items.map((item, index) => (
                <div
                  key={item.id || index}
                  className="w-full min-w-full flex-shrink-0 flex-grow-0 flex flex-col justify-between p-4 sm:p-8 md:p-10 box-border"
                >
                  {/* Top Bar inside Card: Avatar + Name + Rating */}
                  <div className="flex flex-row items-center justify-between pb-3 sm:pb-5 border-b border-gray-100 gap-2 sm:gap-4">
                    <div className="flex items-center gap-2.5 sm:gap-4">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-saffron p-0.5 bg-white flex-shrink-0 shadow-md ring-2 ring-saffron/20"
                        />
                      ) : (
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-navy text-saffron flex items-center justify-center font-black text-lg border-2 border-saffron flex-shrink-0 shadow-md">
                          {item.name?.charAt(0) || "U"}
                        </div>
                      )}
                      <div>
                        <h4 className="font-extrabold text-navy text-xs sm:text-base md:text-lg uppercase tracking-wide leading-tight">
                          {item.name}
                        </h4>
                        <p className="text-[11px] sm:text-xs md:text-sm text-indiagreen font-semibold leading-tight mt-0.5 sm:mt-1 max-w-[160px] sm:max-w-xs">
                          {item.company ? `${item.designation} • ${item.company}` : item.designation}
                        </p>
                      </div>
                    </div>

                    {/* Golden Stars Rating Badge */}
                    <div className="flex items-center bg-amber-50 border border-amber-200/80 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[10px] sm:text-xs md:text-sm text-amber-500 tracking-wider font-bold shadow-xs flex-shrink-0">
                      {"★".repeat(item.rating || 5)}
                    </div>
                  </div>

                  {/* Headline Title */}
                  {item.headline && (
                    <div className="my-3 sm:my-5 text-center">
                      <h3 className="text-xs sm:text-sm md:text-base font-extrabold text-saffron tracking-wider uppercase">
                        "{item.headline}"
                      </h3>
                    </div>
                  )}

                  {/* Quote Body */}
                  <p className="text-gray-700 text-xs sm:text-sm md:text-base italic leading-relaxed text-center font-medium max-w-2xl mx-auto px-1 sm:px-2 mb-3 sm:mb-4">
                    "{item.quote}"
                  </p>

                  {/* Signature Footer */}
                  <div className="mt-2 sm:mt-4 pt-2 sm:pt-3 border-t border-gray-100 flex justify-between items-center text-[10px] sm:text-xs text-gray-500 font-medium">
                    <span className="text-navy font-bold tracking-wider uppercase">
                      {item.name}
                    </span>
                    <span className="text-gray-400 font-semibold">
                      {index + 1} of {items.length}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Arrow Navigation */}
          <button
            onClick={handlePrev}
            aria-label="Previous Testimonial"
            className="hidden sm:flex absolute -left-5 md:-left-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white border border-gray-200 text-navy items-center justify-center shadow-lg hover:bg-saffron hover:text-white transition-all group"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            aria-label="Next Testimonial"
            className="hidden sm:flex absolute -right-5 md:-right-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white border border-gray-200 text-navy items-center justify-center shadow-lg hover:bg-saffron hover:text-white transition-all group"
          >
            <svg className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Mobile Swipe Buttons */}
        <div className="flex sm:hidden justify-between items-center mt-3 px-2 max-w-xl mx-auto">
          <button
            onClick={handlePrev}
            className="bg-white text-navy border border-gray-300 px-3.5 py-1.5 rounded-full text-[11px] font-bold shadow-xs active:scale-95"
          >
            ← Prev
          </button>
          <span className="text-[10px] text-gray-500 font-medium">
            Swipe or tap
          </span>
          <button
            onClick={handleNext}
            className="bg-white text-navy border border-gray-300 px-3.5 py-1.5 rounded-full text-[11px] font-bold shadow-xs active:scale-95"
          >
            Next →
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center items-center gap-1.5 mt-4 sm:mt-6">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? "w-6 sm:w-7 bg-saffron"
                  : "w-2 sm:w-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
