import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const tabs = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Support Us", to: "/support-us" },
];

export default function Navbar() {
  const { token, role, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="bg-navy text-white sticky top-0 z-50 shadow-md">
      <div className="h-1 w-full bg-gradient-to-r from-saffron via-white to-indiagreen"></div>
      
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        
        {/* Brand Logo (Far Left) */}
        <Link to="/" className="flex items-center gap-2 font-extrabold text-base sm:text-xl tracking-tight hover:opacity-90 transition-opacity">
          <span className="text-saffron">Festival</span>
          <span className="text-white">of</span>
          <span className="text-indiagreen">Independence</span>
        </Link>

        {/* Right Navigation Controls (Boxed Tabs Shifted Right) */}
        <div className="hidden md:flex items-center gap-2.5 ml-auto">
          
          {/* Nav Links Container */}
          <nav className="flex items-center gap-2">
            {tabs.map((t) => {
              const isActive = location.pathname === t.to;
              return (
                <Link
                  key={t.to}
                  to={t.to}
                  className={`px-3.5 py-1.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-white/20 border-saffron text-saffron font-bold shadow-2xs"
                      : "bg-white/5 border-white/10 text-white/90 hover:bg-white/15 hover:border-white/25 hover:text-white"
                  }`}
                >
                  {t.label}
                </Link>
              );
            })}
          </nav>

          {/* User Auth Action Buttons (Boxed) */}
          <div className="flex items-center gap-2 pl-2 border-l border-white/15">
            {!token ? (
              <>
                <Link
                  to="/register"
                  className="text-xs sm:text-sm px-4 py-1.5 rounded-xl bg-saffron text-navy font-bold hover:bg-saffron/90 transition-all shadow-xs"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="text-xs sm:text-sm px-3.5 py-1.5 rounded-xl border border-white/30 bg-white/5 hover:bg-white/15 transition-all text-white font-semibold"
                >
                  Login
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={role === "admin" ? "/admin/dashboard" : "/student/dashboard"}
                  className="text-xs sm:text-sm px-3.5 py-1.5 rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 transition-all text-white font-semibold"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-xs sm:text-sm px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-red-600/80 hover:border-red-500 border border-white/15 transition-all text-white font-semibold"
                >
                  Logout
                </button>
              </>
            )}
          </div>

        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 md:hidden hover:bg-white/10 rounded-xl focus:outline-none ml-auto"
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

      {/* Mobile Drawer Dropdown (Boxed Menu Items) */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-navy/95 border-t border-white/10 px-4 py-4 space-y-2">
          {tabs.map((t) => {
            const isActive = location.pathname === t.to;
            return (
              <Link
                key={t.to}
                to={t.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-white/20 border-saffron text-saffron font-bold"
                    : "bg-white/5 border-white/10 text-white/90"
                }`}
              >
                {t.label}
              </Link>
            );
          })}

          {token && (
            <Link
              to={role === "admin" ? "/admin/dashboard" : "/student/dashboard"}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl bg-saffron text-navy font-bold text-xs"
            >
              Dashboard
            </Link>
          )}

          <div className="pt-2 border-t border-white/10 flex gap-2">
            {!token ? (
              <>
                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 rounded-xl bg-saffron text-navy font-bold text-xs"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 rounded-xl border border-white/30 text-white font-semibold text-xs"
                >
                  Login
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full text-center py-2 rounded-xl bg-red-600/80 text-white font-bold text-xs"
              >
                Logout
              </button>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
