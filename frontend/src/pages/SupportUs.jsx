import { useState } from "react";
import upiQrCode from "../assets/upi_qr_code.png";

export default function SupportUs() {
  const [copiedField, setCopiedField] = useState(null);

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50/50 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Page Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-saffron font-bold text-xs uppercase tracking-wider bg-saffron/10 px-3.5 py-1 rounded-full border border-saffron/20">
            Support Our Cause
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-navy tracking-tight">
            Support IYF Kolkata
          </h1>
          <p className="text-xs sm:text-base text-gray-600 font-medium leading-relaxed">
            Your generous contributions empower thousands of undergraduate college students with character, clarity, and timeless values.
          </p>
        </div>

        {/* 3 Organised Cards Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          
          {/* CARD 1: DETAILS ABOUT US & OUR MISSION */}
          <div className="bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="inline-block text-xs font-extrabold text-saffron bg-saffron/10 px-3 py-1 rounded-full border border-saffron/20">
                About Our Mission
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy leading-snug">
                Empowering Youth Through Values
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
                Your contributions directly support IYF Kolkata's spiritual outreach, student development programs, leadership camps, and value-based education for college youth across premier institutes.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2.5 text-xs font-bold text-navy bg-amber-50/70 p-3 rounded-2xl border border-amber-200/60">
                  <span className="text-saffron text-base">🎓</span>
                  <span>Free Student Registration (0 Fees)</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-bold text-navy bg-emerald-50/70 p-3 rounded-2xl border border-emerald-200/60">
                  <span className="text-indiagreen text-base">📖</span>
                  <span>NEP 2020 & Indian Knowledge Systems</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-bold text-navy bg-blue-50/70 p-3 rounded-2xl border border-blue-200/60">
                  <span className="text-blue-600 text-base">🌿</span>
                  <span>Mental Resilience & Emotional Well-Being</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500 font-medium italic">
                "Thank you for helping us shape a responsible, value-driven generation."
              </p>
            </div>
          </div>

          {/* CARD 2: ACCOUNT DETAILS (BANK TRANSFER) */}
          <div className="bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="inline-block text-xs font-extrabold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Direct Bank Transfer
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy leading-snug">
                Bank Account Details
              </h2>
              <p className="text-xs text-gray-500 font-medium">
                Make a direct NEFT / RTGS / IMPS bank transfer to our official account:
              </p>

              {/* Detailed Bank Info List */}
              <div className="space-y-3 text-xs sm:text-sm font-medium pt-1">
                
                <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-200/70 space-y-0.5 relative group">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Account Name</span>
                  <span className="font-extrabold text-navy">International Youth Forum Kolkata</span>
                </div>

                <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-200/70 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Account Number</span>
                    <span className="font-extrabold text-navy tracking-wider">123456789012</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard("123456789012", "acc")}
                    className="text-xs font-bold text-saffron hover:text-navy px-2.5 py-1 rounded-lg bg-white border border-gray-200"
                  >
                    {copiedField === "acc" ? "✓ Copied" : "Copy"}
                  </button>
                </div>

                <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-200/70 space-y-0.5">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Bank Name</span>
                  <span className="font-extrabold text-navy">State Bank of India</span>
                </div>

                <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-200/70 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">IFSC Code</span>
                    <span className="font-extrabold text-navy tracking-wider">SBIN0001234</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard("SBIN0001234", "ifsc")}
                    className="text-xs font-bold text-saffron hover:text-navy px-2.5 py-1 rounded-lg bg-white border border-gray-200"
                  >
                    {copiedField === "ifsc" ? "✓ Copied" : "Copy"}
                  </button>
                </div>

              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <p className="text-[11px] text-gray-500">
                For receipts, please email <span className="font-bold text-navy">contact@iyfkolkata.org</span> after transfer.
              </p>
            </div>
          </div>

          {/* CARD 3: INSTANT UPI SCAN & QR CODE */}
          <div className="bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-between text-center space-y-6">
            <div className="space-y-4 w-full">
              <span className="inline-block text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Instant UPI Payment
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy leading-snug">
                Scan QR Code
              </h2>

              {/* QR Code Container */}
              <div className="bg-amber-50/50 p-4 rounded-3xl border border-amber-200/80 inline-block shadow-xs">
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
                  <img
                    src={upiQrCode}
                    alt="UPI Donation QR Code"
                    className="w-44 h-44 sm:w-48 sm:h-48 object-contain rounded-xl"
                  />
                </div>
                <div className="mt-3 flex items-center justify-center gap-2 bg-white px-3 py-1.5 rounded-full border border-amber-200 text-xs font-extrabold text-navy">
                  <span>UPI ID:</span>
                  <span className="text-saffron">iyfkolkata@sbi</span>
                  <button
                    onClick={() => copyToClipboard("iyfkolkata@sbi", "upi")}
                    className="text-[10px] bg-amber-50 text-slate-700 hover:text-navy px-1.5 py-0.5 rounded border border-amber-200"
                  >
                    {copiedField === "upi" ? "✓" : "Copy"}
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full pt-4 border-t border-gray-100 space-y-2">
              <p className="text-xs text-gray-500 font-medium">
                Scan using any UPI App:
              </p>
              <div className="flex justify-center flex-wrap gap-1.5 text-[11px] font-extrabold text-navy">
                <span className="bg-gray-100 px-2.5 py-1 rounded-lg">GPay</span>
                <span className="bg-gray-100 px-2.5 py-1 rounded-lg">PhonePe</span>
                <span className="bg-gray-100 px-2.5 py-1 rounded-lg">Paytm</span>
                <span className="bg-gray-100 px-2.5 py-1 rounded-lg">BHIM</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
