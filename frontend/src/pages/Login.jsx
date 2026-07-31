import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const [activeTab, setActiveTab] = useState("student"); // "student" | "admin"

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-navy mb-6 text-center">Login</h1>

      <div className="flex border rounded-lg overflow-hidden mb-8">
        <button
          onClick={() => setActiveTab("student")}
          className={`flex-1 py-2.5 text-sm font-semibold ${
            activeTab === "student" ? "bg-navy text-white" : "bg-white text-navy"
          }`}
        >
          Login as Student
        </button>
        <button
          onClick={() => setActiveTab("admin")}
          className={`flex-1 py-2.5 text-sm font-semibold ${
            activeTab === "admin" ? "bg-navy text-white" : "bg-white text-navy"
          }`}
        >
          Login as Admin
        </button>
      </div>

      {activeTab === "student" ? <StudentLoginForm /> : <AdminLoginForm />}
    </div>
  );
}

function StudentLoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await api.post("/auth/student/login", form);
      login({ token: res.data.token, role: "student", user: res.data.student });
      navigate("/student/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        value={form.identifier}
        onChange={(e) => setForm((f) => ({ ...f, identifier: e.target.value }))}
        placeholder="User ID (username or email)"
        required
        className="w-full border rounded px-4 py-2.5"
      />
      <input
        type="password"
        value={form.password}
        onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
        placeholder="Password"
        required
        className="w-full border rounded px-4 py-2.5"
      />
      <div className="text-right">
        <Link to="/forgot-password" style={{ color: "#FF9933" }} className="text-xs hover:underline">
          Forgot password?
        </Link>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-saffron text-navy font-semibold px-6 py-3 rounded hover:opacity-90 disabled:opacity-60"
      >
        {submitting ? "Logging in…" : "Login"}
      </button>

      <p className="text-sm text-gray-600 text-center">
        New here?{" "}
        <Link to="/register" className="text-gold font-medium">
          Register
        </Link>
      </p>
    </form>
  );
}

function AdminLoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "nitin.231218@gmail.com", password: "" });
  const [step, setStep] = useState(1); // 1: Password, 2: Mandatory OTP
  const [otp, setOtp] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [devOtp, setDevOtp] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handlePasswordSubmit(e) {
    e.preventDefault();
    setError("");
    setInfoMessage("");
    setSubmitting(true);
    try {
      const res = await api.post("/auth/admin/login", form);
      if (res.data.requireOtp) {
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
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-center">
          <p className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">🔒 Mandatory 2FA Security</p>
          <p className="text-xs text-gray-700">{infoMessage}</p>
          {devOtp && (
            <p className="text-xs font-mono font-bold text-saffron mt-2">
              [DEV OTP]: <span className="underline">{devOtp}</span>
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">Enter 6-Digit OTP</label>
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="e.g. 123456"
            required
            className="w-full border rounded-xl px-4 py-3 text-center text-lg font-bold tracking-widest focus:ring-2 focus:ring-navy"
          />
        </div>

        {error && <p className="text-xs font-bold text-red-600 text-center">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-saffron text-navy font-extrabold px-6 py-3 rounded-xl hover:bg-saffron/90 disabled:opacity-60 shadow-xs"
        >
          {submitting ? "Verifying OTP..." : "Verify Security OTP & Login"}
        </button>

        <button
          type="button"
          onClick={() => setStep(1)}
          className="w-full text-xs text-gray-500 hover:text-navy text-center underline font-semibold"
        >
          ← Back to Password
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handlePasswordSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Admin Email</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          placeholder="nitin.231218@gmail.com"
          required
          className="w-full border rounded-xl px-4 py-2.5 text-sm font-semibold"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Password</label>
        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          placeholder="Password"
          required
          className="w-full border rounded-xl px-4 py-2.5 text-sm font-semibold"
        />
      </div>

      <div className="text-right">
        <Link to="/forgot-password" style={{ color: "#FF9933" }} className="text-xs font-semibold hover:underline">
          Forgot password?
        </Link>
      </div>

      {error && <p className="text-xs font-bold text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-navy text-white font-extrabold px-6 py-3 rounded-xl hover:opacity-90 disabled:opacity-60 shadow-xs"
      >
        {submitting ? "Checking credentials…" : "Continue to OTP Verification →"}
      </button>
    </form>
  );
}
