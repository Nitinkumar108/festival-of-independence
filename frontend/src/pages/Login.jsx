import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import { toast } from "sonner";
import {
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function Login() {
  const [activeTab, setActiveTab] = useState("student"); // "student" | "admin"

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center bg-[#F4F4F8] p-3 sm:p-5 lg:p-6 font-sans">
      
      {/* Master Card Container - Fills the vertical screen area between navbar and footer */}
      <div className="w-full max-w-5xl lg:max-w-6xl flex-1 flex flex-col justify-center bg-white rounded-[28px] sm:rounded-[34px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)] border border-gray-100/90 p-2.5 sm:p-4 lg:p-5 overflow-hidden my-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-stretch flex-1 w-full">
          
          {/* LEFT COLUMN: Lighter Saffron Mesh Gradient Brand Art Panel */}
          <div className="lg:col-span-5 relative w-full h-full rounded-[22px] sm:rounded-[26px] overflow-hidden p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-gradient-to-br from-[#FFB877] via-[#FF8432] to-[#311D4E] text-white shadow-inner min-h-[220px] lg:min-h-[500px]">
            
            {/* Ambient Soft Lighter Glow Orbs */}
            <div className="absolute -top-16 -left-16 w-64 h-64 bg-[#FFE8B2]/45 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/3 -right-16 w-72 h-72 bg-[#E0AAFF]/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 left-1/4 w-64 h-64 bg-[#BAE6FD]/25 rounded-full blur-3xl pointer-events-none" />

            {/* Top Emblem Logo */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white text-2xl font-black shadow-xs">
                ✦
              </div>
              <span className="text-[11px] font-extrabold tracking-wider uppercase text-white/90 bg-black/15 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                IYF Kolkata
              </span>
            </div>

            {/* Bottom Tagline Typography */}
            <div className="relative z-10 space-y-2.5 pt-8">
              <span className="text-[11px] font-bold text-amber-100 uppercase tracking-widest bg-white/15 backdrop-blur-xs px-3 py-1 rounded-full inline-block border border-white/20">
                You can easily
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight tracking-tight">
                Get access your personal hub for clarity and transformation
              </h2>
              <p className="text-xs sm:text-sm text-white/90 font-medium leading-relaxed">
                Access your schedule, course guides, certificates, and connect with fellow youth.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Authentication Form */}
          <div className="lg:col-span-7 flex flex-col justify-center px-4 sm:px-8 lg:px-10 py-4 sm:py-6 h-full">
            
            {/* Form Top Header */}
            <div className="space-y-1 mb-5">
              <div className="inline-flex items-center gap-1.5 text-saffron font-black">
                <Sparkles className="w-5 h-5 text-saffron animate-pulse" />
              </div>
              
              <h1 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
                {activeTab === "student" ? "Welcome back" : "Admin Portal"}
              </h1>
              
              <p className="text-xs sm:text-sm text-gray-500 font-medium leading-snug">
                {activeTab === "student"
                  ? "Access your student dashboard, milestones, and schedule."
                  : "Super Admin & coordinator secure login portal."}
              </p>
            </div>

            {/* Role Switcher Pill Tabs */}
            <div className="flex bg-gray-100/90 p-1 rounded-xl border border-gray-200/70 mb-5">
              <button
                type="button"
                onClick={() => setActiveTab("student")}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  activeTab === "student"
                    ? "bg-white text-saffron shadow-xs"
                    : "text-gray-600 hover:text-navy"
                }`}
              >
                Student Sign In
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("admin")}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  activeTab === "admin"
                    ? "bg-white text-saffron shadow-xs"
                    : "text-gray-600 hover:text-navy"
                }`}
              >
                Admin Sign In
              </button>
            </div>

            {/* Render Form based on Tab */}
            {activeTab === "student" ? <StudentLoginForm /> : <AdminLoginForm />}

            {/* Footer Sign Up Link */}
            <div className="text-center pt-4 mt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500 font-medium">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-saffron font-extrabold hover:underline"
                >
                  Register for free
                </Link>
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

function StudentLoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ identifier: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const savedIdentifier = localStorage.getItem("remembered_student_id");
    if (savedIdentifier) {
      setForm((f) => ({ ...f, identifier: savedIdentifier }));
      setRememberMe(true);
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await api.post("/auth/student/login", form);

      if (rememberMe) {
        localStorage.setItem("remembered_student_id", form.identifier);
      } else {
        localStorage.removeItem("remembered_student_id");
      }

      login({ token: res.data.token, role: "student", user: res.data.student });
      toast.success("Welcome back! Logged in successfully.");
      navigate("/student/dashboard");
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed. Please check your credentials.";
      setError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
      {/* Identifier Input */}
      <div>
        <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1.5">
          Your email or username
        </label>
        <input
          value={form.identifier}
          onChange={(e) => setForm((f) => ({ ...f, identifier: e.target.value }))}
          placeholder="name@example.com or username"
          required
          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-navy placeholder:text-gray-400 focus:outline-none focus:border-saffron focus:ring-4 focus:ring-saffron/10 transition-all shadow-2xs"
        />
      </div>

      {/* Password Input with Visibility Toggle */}
      <div>
        <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1.5">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            placeholder="••••••••••••"
            required
            className="w-full bg-white border border-gray-200 rounded-xl pl-4 pr-11 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-navy placeholder:text-gray-400 focus:outline-none focus:border-saffron focus:ring-4 focus:ring-saffron/10 transition-all shadow-2xs"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-navy p-1 transition-colors"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between pt-0.5">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-saffron focus:ring-saffron accent-saffron cursor-pointer"
          />
          <span className="text-xs font-bold text-gray-600 hover:text-navy transition-colors">
            Remember me
          </span>
        </label>

        <Link
          to="/forgot-password"
          className="text-xs font-bold text-saffron hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      {error && (
        <p className="text-xs font-bold text-red-600 bg-red-50 p-2.5 rounded-xl text-center border border-red-200">
          {error}
        </p>
      )}

      {/* Saffron Glowing Action Button */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-gradient-to-r from-saffron to-[#F57C00] text-navy font-black text-sm sm:text-base py-3 sm:py-3.5 rounded-xl hover:text-white transition-all shadow-[0_10px_25px_rgba(255,153,51,0.35)] hover:shadow-[0_12px_30px_rgba(255,153,51,0.5)] active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2 mt-1"
      >
        <span>{submitting ? "Signing in..." : "Get Started"}</span>
        {!submitting && <ArrowRight className="w-4 h-4" />}
      </button>
    </form>
  );
}

function AdminLoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "nitin.231218@gmail.com", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const savedAdminEmail = localStorage.getItem("remembered_admin_email");
    if (savedAdminEmail) {
      setForm((f) => ({ ...f, email: savedAdminEmail }));
      setRememberMe(true);
    }
  }, []);

  async function handlePasswordSubmit(e) {
    e.preventDefault();
    setError("");
    setInfoMessage("");
    setSubmitting(true);
    try {
      const res = await api.post("/auth/admin/login", form);

      if (rememberMe) {
        localStorage.setItem("remembered_admin_email", form.email);
      } else {
        localStorage.removeItem("remembered_admin_email");
      }

      if (res.data.requireOtp) {
        setStep(2);
        setInfoMessage(`Security OTP code sent to ${res.data.email}`);
        toast.info("Security OTP code sent to your email.");
      } else {
        login({ token: res.data.token, role: "admin", user: res.data.admin });
        toast.success("Welcome, Administrator!");
        navigate("/admin/dashboard");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Admin login failed.";
      setError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleOtpSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await api.post("/auth/admin/verify-otp", { email: form.email, otp });
      login({ token: res.data.token, role: "admin", user: res.data.admin });
      toast.success("2FA Verified! Logged in as Super Admin.");
      navigate("/admin/dashboard");
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid or expired OTP code.";
      setError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  }

  if (step === 2) {
    return (
      <form onSubmit={handleOtpSubmit} className="space-y-3.5">
        <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-center space-y-0.5">
          <p className="text-xs font-bold text-amber-800 uppercase tracking-wider">🔒 Mandatory 2FA Security</p>
          <p className="text-xs text-gray-700 font-medium">{infoMessage}</p>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1.5">
            Enter 6-Digit OTP
          </label>
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="e.g. 123456"
            required
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-center text-xl font-black tracking-widest text-navy focus:outline-none focus:border-saffron focus:ring-4 focus:ring-saffron/10 transition-all shadow-2xs"
          />
        </div>

        {error && <p className="text-xs font-bold text-red-600 text-center">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-gradient-to-r from-saffron to-[#F57C00] text-navy font-black text-sm sm:text-base py-3 sm:py-3.5 rounded-xl hover:text-white transition-all disabled:opacity-60 shadow-[0_10px_25px_rgba(255,153,51,0.35)]"
        >
          {submitting ? "Verifying..." : "Verify Security OTP & Login"}
        </button>

        <button
          type="button"
          onClick={() => setStep(1)}
          className="w-full text-xs text-gray-500 hover:text-navy text-center underline font-semibold block pt-1"
        >
          ← Back to Password
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handlePasswordSubmit} className="space-y-3.5">
      <div>
        <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1.5">
          Admin Email
        </label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          placeholder="admin@example.com"
          required
          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-navy placeholder:text-gray-400 focus:outline-none focus:border-saffron focus:ring-4 focus:ring-saffron/10 transition-all shadow-2xs"
        />
      </div>

      <div>
        <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1.5">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            placeholder="••••••••••••"
            required
            className="w-full bg-white border border-gray-200 rounded-xl pl-4 pr-11 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-navy placeholder:text-gray-400 focus:outline-none focus:border-saffron focus:ring-4 focus:ring-saffron/10 transition-all shadow-2xs"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-navy p-1 transition-colors"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between pt-0.5">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-saffron focus:ring-saffron accent-saffron cursor-pointer"
          />
          <span className="text-xs font-bold text-gray-600 hover:text-navy transition-colors">
            Remember me
          </span>
        </label>

        <Link
          to="/forgot-password"
          className="text-xs font-bold text-saffron hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      {error && <p className="text-xs font-bold text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-gradient-to-r from-saffron to-[#F57C00] text-navy font-black text-sm sm:text-base py-3 sm:py-3.5 rounded-xl hover:text-white transition-all shadow-[0_10px_25px_rgba(255,153,51,0.35)] hover:shadow-[0_12px_30px_rgba(255,153,51,0.5)] active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2 mt-1"
      >
        <span>{submitting ? "Checking..." : "Continue to OTP Verification"}</span>
        {!submitting && <ArrowRight className="w-4 h-4" />}
      </button>
    </form>
  );
}
