import { useState } from "react";
import api from "../api/axios.js";

export default function ContactSection() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    message: "",
  });
  const [contactStatus, setContactStatus] = useState(null);

  function handleContactChange(e) {
    setContactForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleContactSubmit(e) {
    e.preventDefault();
    setContactStatus("sending");
    try {
      await api.post("/contact", contactForm);
      setContactStatus("sent");
      setContactForm({ name: "", email: "", phone: "", college: "", message: "" });
    } catch (err) {
      setContactStatus("error");
    }
  }

  return (
    <section className="bg-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* 2-Column Grid Layout matching reference design */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: 3 Stacked Info Cards */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Card 1: Location */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center flex-shrink-0 shadow-xs">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-extrabold text-navy text-sm sm:text-base">Location:</h4>
                <p className="text-gray-500 text-xs sm:text-sm mt-1 leading-relaxed">
                  3C Albert Road, Near Minto Park, Kolkata 700017
                </p>
              </div>
            </div>

            {/* Card 2: WhatsApp / Contact */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center flex-shrink-0 shadow-xs">
                <svg className="w-6 h-6 fill-current text-emerald-600" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </div>
              <div>
                <h4 className="font-extrabold text-navy text-sm sm:text-base">WhatsApp / Contact:</h4>
                <p className="text-gray-500 text-xs sm:text-sm mt-1 leading-relaxed font-semibold">
                  +91 6290 749253
                </p>
              </div>
            </div>

            {/* Card 3: Email us at */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center flex-shrink-0 shadow-xs">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-extrabold text-navy text-sm sm:text-base">Email us at:</h4>
                <p className="text-gray-500 text-xs sm:text-sm mt-1 leading-relaxed font-semibold">
                  iyfkolkatarg@gmail.com
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Form Design matching reference layout */}
          <div className="lg:col-span-8 bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-10 shadow-lg shadow-gray-100/60">
            {/* Header inside Form Box */}
            <div className="mb-6">
              <span className="text-saffron font-bold text-xs uppercase tracking-wider bg-saffron/10 px-3 py-1 rounded-full border border-saffron/20">
                Get in Touch
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight mt-2">
                Send us a Message
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm mt-1 font-medium">
                Have questions about the festival or registration? Send us a message below!
              </p>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              {/* 2-Column Grid Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Full Name */}
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={contactForm.name}
                    onChange={handleContactChange}
                    placeholder="Full name:"
                    required
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-xs sm:text-sm font-medium text-navy placeholder-gray-400 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                </div>

                {/* Email Address */}
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleContactChange}
                    placeholder="Email address:"
                    required
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-xs sm:text-sm font-medium text-navy placeholder-gray-400 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                </div>

                {/* Phone Number */}
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={contactForm.phone}
                    onChange={handleContactChange}
                    placeholder="Phone number:"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-xs sm:text-sm font-medium text-navy placeholder-gray-400 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                </div>

                {/* College / Organization */}
                <div className="relative">
                  <input
                    type="text"
                    name="college"
                    value={contactForm.college}
                    onChange={handleContactChange}
                    placeholder="College / Organization (optional):"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-xs sm:text-sm font-medium text-navy placeholder-gray-400 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                  </span>
                </div>

              </div>

              {/* Message Textarea */}
              <div className="relative">
                <textarea
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactChange}
                  placeholder="Message:"
                  required
                  rows={4}
                  className="w-full bg-white border border-gray-200 rounded-xl p-4 text-xs sm:text-sm font-medium text-navy placeholder-gray-400 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all"
                />
              </div>

              {/* Submit Button matching reference design */}
              <button
                type="submit"
                disabled={contactStatus === "sending"}
                className="w-full bg-saffron text-navy font-bold text-sm sm:text-base py-4 rounded-xl hover:bg-indiagreen hover:text-white transition-all shadow-md hover:shadow-lg disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {contactStatus === "sending" ? (
                  "Sending Message..."
                ) : (
                  <>
                    <span>Send Now</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>

              {/* Feedback messages */}
              {contactStatus === "sent" && (
                <p className="text-xs font-bold text-emerald-700 bg-emerald-50 p-3 rounded-xl text-center border border-emerald-200">
                  ✓ Message sent successfully! We will get back to you soon.
                </p>
              )}
              {contactStatus === "error" && (
                <p className="text-xs font-bold text-red-600 bg-red-50 p-3 rounded-xl text-center border border-red-200">
                  Failed to send message. Please try again.
                </p>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
