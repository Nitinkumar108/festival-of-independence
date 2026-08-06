import { useState } from "react";

export default function SupportUs() {
  const [copiedField, setCopiedField] = useState(null);

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-white via-amber-50/30 to-cream py-12 sm:py-18 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Page Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-saffron font-extrabold text-xs uppercase tracking-wider bg-saffron/10 px-4 py-1.5 rounded-full border border-saffron/30 shadow-xs">
            Support Our Cause
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-navy tracking-tight">
            Support ISKCON Youth Forum Kolkata
          </h1>
          <p className="text-xs sm:text-base text-gray-600 font-medium leading-relaxed">
            Your generous contributions empower thousands of undergraduate college students with character, clarity, and timeless values.
          </p>
        </div>

        {/* 3 STRUCTURED SAFFRON THEME CARDS (Matching About Us card format) */}
        <div className="space-y-8">
          
          {/* CARD 1: EMPOWERING YOUTH THROUGH VALUES & FINANCIAL TRANSPARENCY */}
          <div className="bg-amber-50/90 border-2 border-saffron/40 rounded-3xl p-6 sm:p-8 shadow-md border-l-8 border-l-saffron transition-all hover:shadow-lg space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-saffron/20 pb-3">
              <span className="text-[11px] font-black text-saffron uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-saffron/30 shadow-2xs">
                🎓 About Our Mission & Transparency
              </span>
              <span className="text-xs font-extrabold text-navy">
                Zero-Tolerance Accounting Policy
              </span>
            </div>

            <h2 className="text-xl sm:text-3xl font-black text-navy leading-snug">
              Empowering Youth Through Values
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
              <p>
                As we register the students completely free, your valuable contribution will be used in organising the event, which means purchasing Zoom subscriptions, purchasing different web-hosting's, printing and circulating the promotional materials and other essential logistic expenses. After completion of each level of this course, we have planned a camp. So, your contribution will be used to sponsor Prasadam, rent the venue, arrange transport, and cover other essential costs.
              </p>
              <p>
                According to our zero-tolerance accounting policy, we publish details of each donation received and each expenditure of the funds. To get an inflow-outflow sheet, Please click the following link....
              </p>
            </div>

            {/* Inflow-Outflow Financial Statement Sheet Box Link */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-saffron/50 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <div className="w-10 h-10 rounded-xl bg-saffron/15 text-saffron font-black flex items-center justify-center text-lg flex-shrink-0">
                  📊
                </div>
                <div>
                  <h4 className="font-extrabold text-navy text-xs sm:text-sm">Inflow-Outflow Financial Sheet</h4>
                  <p className="text-[11px] text-gray-500 font-medium">View full itemized donation receipts & event expenditure log</p>
                </div>
              </div>
              <a
                href="#inflow-outflow"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Official Inflow-Outflow Statement sheet will open here.");
                }}
                className="bg-saffron text-navy font-extrabold text-xs px-5 py-2.5 rounded-xl hover:bg-navy hover:text-white transition-all shadow-xs flex items-center gap-1.5 flex-shrink-0"
              >
                <span>Click Here to View Sheet</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* CARD 2: DIRECT BANK TRANSFER (MIDDLE SEGMENT) */}
          <div className="bg-orange-50/90 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-md border-l-8 border-l-amber-600 transition-all hover:shadow-lg space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-300/40 pb-3">
              <span className="text-[11px] font-black text-amber-700 uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-amber-300 shadow-2xs">
                🏦 -: To Contribute :-
              </span>
              <span className="text-xs font-extrabold text-navy">
                NEFT / RTGS / IMPS
              </span>
            </div>

            <h2 className="text-xl sm:text-3xl font-black text-navy leading-snug">
              Bank Account Details
            </h2>

            <p className="text-xs sm:text-sm text-gray-600 font-medium">
              Make a direct bank transfer to our official ISKCON account:
            </p>

            {/* Bank Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs sm:text-sm font-medium">
              
              <div className="bg-white p-4 rounded-2xl border border-amber-200/80 space-y-0.5 shadow-2xs">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">A/C Name</span>
                <span className="font-black text-navy text-base">ISKCON</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-amber-200/80 flex items-center justify-between shadow-2xs">
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">A/C No.</span>
                  <span className="font-black text-navy tracking-wider text-base">005010100161718</span>
                </div>
                <button
                  onClick={() => copyToClipboard("005010100161718", "acc")}
                  className="text-xs font-bold text-saffron hover:text-navy px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200"
                >
                  {copiedField === "acc" ? "✓ Copied" : "Copy"}
                </button>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-amber-200/80 flex items-center justify-between shadow-2xs">
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">IFSC Code</span>
                  <span className="font-black text-navy tracking-wider text-base">UTIB0000005</span>
                </div>
                <button
                  onClick={() => copyToClipboard("UTIB0000005", "ifsc")}
                  className="text-xs font-bold text-saffron hover:text-navy px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200"
                >
                  {copiedField === "ifsc" ? "✓ Copied" : "Copy"}
                </button>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-amber-200/80 space-y-0.5 shadow-2xs">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Bank Name</span>
                <span className="font-black text-navy text-sm">AXIS BANK LTD.</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-amber-200/80 space-y-0.5 shadow-2xs sm:col-span-2 lg:col-span-2">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Branch</span>
                <span className="font-black text-navy text-sm">KOLKATA MAIN BRANCH</span>
              </div>

            </div>

            {/* BIG BOLD NOTICE BOX FOR WHATSAPP TRANSACTION PROOF & CITIZENSHIP */}
            <div className="bg-gradient-to-r from-red-600 to-amber-600 text-white rounded-2xl p-5 sm:p-6 shadow-lg space-y-3 border-2 border-white">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest bg-black/20 px-3 py-1 rounded-full w-fit">
                ⚠️ CRITICAL DONOR INSTRUCTIONS
              </div>

              <p className="text-sm sm:text-base font-black leading-snug tracking-wide">
                You must share the screenshot/ transaction ID and date of your transfer in our WhatsApp number (
                <a href="https://wa.me/916290749253" target="_blank" rel="noreferrer" className="underline text-yellow-300 hover:text-white">
                  +91 6290749253
                </a>
                ), alongwith your name and postal Address. Otherwise, the contribution will not be directed towards this cause.
              </p>

              <div className="pt-2 border-t border-white/30 flex flex-wrap items-center justify-between gap-2 text-xs font-extrabold">
                <span className="bg-white/20 px-3 py-1 rounded-xl">
                  🇮🇳 The donor must be an Indian citizen.
                </span>
                <span className="text-amber-100">
                  For receipts: iyfkolkatarg@gmail.com
                </span>
              </div>
            </div>

          </div>

          {/* CARD 3: CONVENIENT ONLINE DONATION & RAZORPAY LINK (LAST SEGMENT) */}
          <div className="bg-amber-100/70 border-2 border-saffron rounded-3xl p-6 sm:p-8 shadow-md border-l-8 border-l-saffron transition-all hover:shadow-lg space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-saffron/30 pb-3">
              <span className="text-[11px] font-black text-saffron uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-saffron/40 shadow-2xs">
                🔗 Convenient Online Payment
              </span>
              <span className="text-xs font-extrabold text-navy">
                Razorpay / UPI / Cards
              </span>
            </div>

            <h2 className="text-xl sm:text-3xl font-black text-navy leading-snug">
              At last, donate in your most convenient way by clicking the following 🔗
            </h2>

            {/* RAZORPAY PAYMENT LINK BOX */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border-2 border-saffron shadow-sm space-y-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-center md:text-left">
                  <div className="w-12 h-12 rounded-2xl bg-saffron text-navy font-black flex items-center justify-center text-2xl shadow-xs flex-shrink-0">
                    💳
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-navy">Razorpay Online Payment Portal</h3>
                    <p className="text-xs text-gray-600 font-medium">Instant contribution via Cards, UPI, NetBanking & Digital Wallets</p>
                  </div>
                </div>

                <a
                  href="https://razorpay.com"
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("The Razorpay payment gateway page link is currently being integrated and will open here shortly.");
                  }}
                  className="bg-saffron text-navy font-black text-xs sm:text-sm px-6 py-3.5 rounded-xl hover:bg-navy hover:text-white transition-all shadow-md hover:shadow-lg flex items-center gap-2 flex-shrink-0"
                >
                  <span>🔗 Click to Donate via Razorpay</span>
                  <span>→</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
