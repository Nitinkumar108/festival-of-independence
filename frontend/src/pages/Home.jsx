import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <section className="relative bg-navy text-white overflow-hidden py-24">
        {/* Flag aura glow effects */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-saffron/10 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indiagreen/10 rounded-full blur-3xl translate-x-1/4 translate-y-1/4 pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <p className="uppercase tracking-widest text-saffron text-sm font-semibold mb-3">
            ISKCON Youth Forum, Kolkata
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Festival of <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron via-white to-indiagreen">Independence</span>
          </h1>
          <p className="max-w-2xl mx-auto text-white/80 mb-8">
            IYF Kolkata's offering on the 80th Independence Day of Bharat Varsha — exploring,
            inculcating and celebrating our nation's great social, cultural and spiritual
            heritage.
          </p>
          <Link
            to="/register"
            className="inline-block bg-saffron text-navy font-bold px-8 py-3 rounded-full hover:bg-indiagreen hover:text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Register Now
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-8">
        <div className="p-6 border border-gray-200 rounded-xl hover:border-indiagreen/40 hover:shadow-lg transition-all duration-300 group">
          <h3 className="font-semibold text-navy mb-2 group-hover:text-indiagreen transition-colors">Upcoming Programs</h3>
          <p className="text-sm text-gray-600">
            See the festival's schedule of talks, cultural events and celebrations.
          </p>
          <Link to="/events" className="text-gold text-sm font-bold mt-3 inline-block hover:translate-x-1 transition-transform">
            View events →
          </Link>
        </div>
        <div className="p-6 border border-gray-200 rounded-xl hover:border-saffron/40 hover:shadow-lg transition-all duration-300 group">
          <h3 className="font-semibold text-navy mb-2 group-hover:text-saffron transition-colors">About the Festival</h3>
          <p className="text-sm text-gray-600">
            Learn about IYF Kolkata and the vision behind this Independence Day tribute.
          </p>
          <Link to="/about" className="text-gold text-sm font-bold mt-3 inline-block hover:translate-x-1 transition-transform">
            Read more →
          </Link>
        </div>
        <div className="p-6 border border-gray-200 rounded-xl hover:border-indiagreen/40 hover:shadow-lg transition-all duration-300 group">
          <h3 className="font-semibold text-navy mb-2 group-hover:text-indiagreen transition-colors">Support Us</h3>
          <p className="text-sm text-gray-600">
            Your contribution helps IYF Kolkata continue its outreach and preaching work.
          </p>
          <Link to="/support-us" className="text-gold text-sm font-bold mt-3 inline-block hover:translate-x-1 transition-transform">
            Donate →
          </Link>
        </div>
      </section>
    </div>
  );
}
