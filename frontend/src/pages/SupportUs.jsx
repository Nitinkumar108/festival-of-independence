import upiQrCode from "../assets/upi_qr_code.png";

export default function SupportUs() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-navy mb-6">Support Us</h1>
      <p className="text-gray-700 leading-relaxed mb-10">
        Your contributions directly support IYF Kolkata's spiritual outreach, community services, 
        and student development programs. Help us spread values and knowledge for a better society.
      </p>

      <div className="grid md:grid-cols-5 gap-8 border rounded-2xl overflow-hidden bg-white shadow-lg">
        {/* Donation Details */}
        <div className="md:col-span-3 p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold text-navy mb-4">Direct Donations</h3>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              We accept direct contributions via UPI scan, UPI ID transfer, or direct bank transfer.
              All funds go toward running our community youth centers and festivals.
            </p>

            <div className="space-y-4">
              <div className="border-l-4 border-saffron pl-4">
                <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">UPI Address</span>
                <span className="text-lg font-bold text-navy">iyfkolkata@sbi</span>
              </div>

              <div className="border-l-4 border-gold pl-4">
                <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Bank Details</span>
                <div className="text-sm text-gray-600 mt-1">
                  <p><strong className="text-navy">Account Name:</strong> International Youth Forum Kolkata</p>
                  <p><strong className="text-navy">Account Number:</strong> 123456789012</p>
                  <p><strong className="text-navy">Bank Name:</strong> State Bank of India</p>
                  <p><strong className="text-navy">IFSC Code:</strong> SBIN0001234</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-xs text-gray-500">
            For receipt or tax documentation requests, please contact us at <span className="font-semibold text-navy">contact@iyfkolkata.org</span> after donation.
          </div>
        </div>

        {/* QR Code Scan card */}
        <div className="md:col-span-2 bg-cream p-8 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-gray-100">
          <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-100 flex flex-col items-center">
            <img 
              src={upiQrCode} 
              alt="UPI Donation QR Code" 
              className="w-48 h-48 object-contain mb-4 rounded-xl border border-gray-50"
            />
            <span className="text-xs font-bold text-navy tracking-wide uppercase px-3 py-1 bg-saffron/10 text-saffron rounded-full">
              Scan to Pay / Donate
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center max-w-[200px]">
            Scan this QR code using any UPI app (GPay, PhonePe, Paytm, BHIM) to make a payment.
          </p>
        </div>
      </div>
    </div>
  );
}
