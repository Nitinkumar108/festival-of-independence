import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const tabs = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Upcoming Events", to: "/events" },
  { label: "Support Us", to: "/support-us" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact Us", to: "/contact" },
  { label: "FAQ", to: "/faq" },
];

export default function Navbar() {
  const { token, role, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="bg-navy text-white sticky top-0 z-50 shadow">
      <div className="h-1 w-full bg-gradient-to-r from-saffron via-white to-indiagreen"></div>
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="font-bold text-lg tracking-wide hover:opacity-90 transition-opacity">
          <span className="text-saffron">Festival</span> of <span className="text-indiagreen">Independence</span>
        </Link>

        <nav className="hidden md:flex items-center gap-5 text-sm">
          {tabs.map((t) => (
            <Link key={t.to} to={t.to} className="hover:text-saffron transition-colors">
              {t.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {!token && (
            <>
              <Link
                to="/register"
                className="text-sm px-3 py-1.5 rounded bg-saffron text-navy font-semibold hover:opacity-90"
              >
                Register
              </Link>
              <Link to="/login" className="text-sm px-3 py-1.5 rounded border border-white/40 hover:bg-white/10">
                Login
              </Link>
            </>
          )}
          {token && (
            <>
              <Link
                to={role === "admin" ? "/admin/dashboard" : "/student/dashboard"}
                className="text-sm px-3 py-1.5 rounded border border-white/40 hover:bg-white/10"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm px-3 py-1.5 rounded bg-white/10 hover:bg-white/20"
              >
                Logout
              </button>
            </>
          )}

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1 md:hidden hover:bg-white/10 rounded focus:outline-none ml-1"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6 text-saffron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-navy/95 border-t border-white/10 px-4 py-4 flex flex-col gap-4 text-sm">
          {tabs.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-saffron transition-colors py-1 border-b border-white/5 last:border-0"
            >
              {t.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
