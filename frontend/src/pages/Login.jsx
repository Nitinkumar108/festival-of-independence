import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const [activeTab, setActiveTab] = useState("student"); // "student" | "admin"

  return (
    <div className="w-full min-h-screen bg-slate-50/60 py-12 sm:py-16 px-4 font-sans text-slate-800">
      <div className="max-w-md mx-auto bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        
        {/* Header Title */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-navy tracking-tight">Login</h1>
          <p className="text-xs text-gray-500 font-medium">
            {activeTab === "student" ? "Access your student dashboard & schedule" : "Administrator login"}
          </p>
        </div>

        {/* Role Switcher Tabs */}
        <div className="flex bg-gray-100 p-1.5 rounded-2xl border border-gray-200/80">
          <button
            onClick={() => setActiveTab("student")}
            className={`flex-1 py-2 text-xs font-extrabold rounded-xl transition-all ${
              activeTab === "student"
                ? "bg-navy text-white shadow-xs"
                : "text-gray-600 hover:text-navy"
            }`}
          >
            Login as Student
          </button>
          <button
            onClick={() => setActiveTab("admin")}
            className={`flex-1 py-2 text-xs font-extrabold rounded-xl transition-all ${
              activeTab === "admin"
                ? "bg-navy text-white shadow-xs"
                : "text-gray-600 hover:text-navy"
            }`}
          >
            Login as Admin
          </button>
        </div>

        {activeTab === "student" ? <StudentLoginForm /> : <AdminLoginForm />}

      </div>
    </div>
  );
}

function StudentLoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ identifier: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Load remembered identifier on component mount
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

      // Handle Remember Me storage
      if (rememberMe) {
        localStorage.setItem("remembered_student_id", form.identifier);
      } else {
        localStorage.removeItem("remembered_student_id");
      }

      login({ token: res.data.token, role: "student", user: res.data.student });
      navigate("/student/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
          Username or Email
        </label>
        <input
          value={form.identifier}
          onChange={(e) => setForm((f) => ({ ...f, identifier: e.target.value }))}
          placeholder="Enter username or email"
          required
          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-medium text-navy placeholder-gray-400 focus:outline-none focus:border-saffron transition-all"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
          Password
        </label>
        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          placeholder="Enter password"
          required
          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-medium text-navy placeholder-gray-400 focus:outline-none focus:border-saffron transition-all"
        />
      </div>

      {/* Remember Me Checkbox & Forgot Password */}
      <div className="flex items-center justify-between pt-1">
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

        <Link to="/forgot-password" className="text-xs font-bold text-saffron hover:underline">
          Forgot password?
        </Link>
      </div>

      {error && (
        <p className="text-xs font-bold text-red-600 bg-red-50 p-3 rounded-xl text-center border border-red-200">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-saffron text-navy font-black py-3.5 rounded-xl hover:bg-indiagreen hover:text-white transition-all disabled:opacity-60 shadow-md"
      >
        {submitting ? "Logging in…" : "Login"}
      </button>

      <p className="text-xs text-gray-500 text-center pt-2 font-medium">
        New here?{" "}
        <Link to="/register" className="text-saffron font-extrabold hover:underline">
          Register for free
        </Link>
      </p>
    </form>
  );
}

function AdminLoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "nitin.231218@gmail.com", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [devOtp, setDevOtp] = useState("");
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
      if (res.data.requireOtp) {
        if (rememberMe) {
          localStorage.setItem("remembered_admin_email", form.email);
        } else {
          localStorage.removeItem("remembered_admin_email");
        }
        setStep(2);
        setInfoMessage(`Mandatory security OTP code sent to ${res.data.email}`);
        if (res.data.devOtp) setDevOtp(res.data.devOtp);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Admin login failed.");
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
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired OTP code.");
    } finally {
      setSubmitting(false);
    }
  }

  if (step === 2) {
    return (
      <form onSubmit={handleOtpSubmit} className="space-y-4">
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-center space-y-1">
          <p className="text-xs font-bold text-amber-800 uppercase tracking-wider">🔒 Mandatory 2FA Security</p>
          <p className="text-xs text-gray-700 font-medium">{infoMessage}</p>
          {devOtp && (
            <p className="text-xs font-mono font-bold text-saffron pt-1">
              [DEV OTP]: <span className="underline">{devOtp}</span>
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Enter 6-Digit OTP</label>
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="e.g. 123456"
            required
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-center text-lg font-bold tracking-widest text-navy focus:outline-none focus:border-saffron"
          />
        </div>

        {error && <p className="text-xs font-bold text-red-600 text-center">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-saffron text-navy font-black py-3.5 rounded-xl hover:bg-indiagreen hover:text-white transition-all disabled:opacity-60 shadow-md"
        >
          {submitting ? "Verifying..." : "Verify Security OTP & Login"}
        </button>

        <button
          type="button"
          onClick={() => setStep(1)}
          className="w-full text-xs text-gray-500 hover:text-navy text-center underline font-semibold block"
        >
          ← Back to Password
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handlePasswordSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Admin Email</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          placeholder="nitin.231218@gmail.com"
          required
          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-medium text-navy placeholder-gray-400 focus:outline-none focus:border-saffron"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Password</label>
        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          placeholder="Password"
          required
          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-medium text-navy placeholder-gray-400 focus:outline-none focus:border-saffron"
        />
      </div>

      {/* Remember Me Checkbox & Forgot Password */}
      <div className="flex items-center justify-between pt-1">
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

        <Link to="/forgot-password" className="text-xs font-bold text-saffron hover:underline">
          Forgot password?
        </Link>
      </div>

      {error && <p className="text-xs font-bold text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-saffron text-navy font-black py-3.5 rounded-xl hover:bg-indiagreen hover:text-white transition-all disabled:opacity-60 shadow-md"
      >
        {submitting ? "Checking..." : "Continue to OTP Verification →"}
      </button>
    </form>
  );
}
