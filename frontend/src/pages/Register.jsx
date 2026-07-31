import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [colleges, setColleges] = useState([]);
  const [form, setForm] = useState({
    fullName: "",
    collegeId: "",
    phoneNumber: "",
    address: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  // Email OTP states
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailOtpCode, setEmailOtpCode] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailOtpLoading, setEmailOtpLoading] = useState(false);
  const [emailOtpMsg, setEmailOtpMsg] = useState("");

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api
      .get("/colleges")
      .then((res) => setColleges(res.data))
      .catch(() => setColleges([]));
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setError("");

    if (name === "email") {
      setEmailVerified(false);
      setEmailOtpSent(false);
      setEmailOtpMsg("");
    }
  }

  async function handleSendEmailOtp() {
    if (!form.email.trim()) {
      setEmailOtpMsg("Please enter a valid email address first.");
      return;
    }
    setEmailOtpLoading(true);
    setEmailOtpMsg("");
    try {
      const res = await api.post("/auth/send-otp", { type: "email", target: form.email.trim() });
      setEmailOtpSent(true);
      const msg = res.data.devOtp
        ? `OTP sent! (Dev Code: ${res.data.devOtp})`
        : "OTP sent to your email address.";
      setEmailOtpMsg(msg);
    } catch (err) {
      setEmailOtpMsg(err.response?.data?.message || "Failed to send Email OTP.");
    } finally {
      setEmailOtpLoading(false);
    }
  }

  async function handleVerifyEmailOtp() {
    if (!emailOtpCode.trim()) return;
    setEmailOtpLoading(true);
    setEmailOtpMsg("");
    try {
      await api.post("/auth/verify-otp", { type: "email", target: form.email.trim(), code: emailOtpCode.trim() });
      setEmailVerified(true);
      setEmailOtpMsg("Email verified successfully! ✓");
    } catch (err) {
      setEmailOtpMsg(err.response?.data?.message || "Invalid OTP code.");
    } finally {
      setEmailOtpLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // Validate mandatory fields
    if (!form.fullName.trim()) {
      setError("Full Name is required.");
      return;
    }
    if (!form.collegeId) {
      setError("Please select your college or institution.");
      return;
    }
    if (!form.email.trim()) {
      setError("Email Address is required.");
      return;
    }
    if (!emailVerified) {
      setError("Please verify your Email address with OTP before registering.");
      return;
    }
    if (!form.phoneNumber.trim()) {
      setError("Phone Number is required.");
      return;
    }
    if (!form.address.trim()) {
      setError("Address is required.");
      return;
    }
    if (!form.username.trim()) {
      setError("Username is required.");
      return;
    }
    if (!form.password) {
      setError("Password is required.");
      return;
    }
    if (!form.confirmPassword) {
      setError("Confirm Password is required.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.post("/auth/student/register", {
        fullName: form.fullName.trim(),
        collegeId: form.collegeId,
        phoneNumber: form.phoneNumber.trim(),
        address: form.address.trim(),
        email: form.email.trim(),
        username: form.username.trim(),
        password: form.password,
      });

      login({ token: res.data.token, role: "student", user: res.data.student });
      navigate("/student/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-navy mb-2">Student Registration</h1>
      <p className="text-gray-600 mb-6">
        Already registered?{" "}
        <Link to="/login" className="text-gold font-medium">
          Login here
        </Link>
        .
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="e.g. Rahul Sharma"
            required
            className="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
          />
        </div>

        {/* College / Institution Selection */}
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
            College / Institution <span className="text-red-500">*</span>
          </label>
          <select
            name="collegeId"
            value={form.collegeId}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2.5 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
          >
            <option value="">-- Select College / Institution --</option>
            {colleges.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Email Verification Section */}
        <div className="border rounded-xl p-4 bg-gray-50/50 space-y-2">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
            Email Address (OTP Verification) <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="e.g. rahul@example.com"
              required
              disabled={emailVerified}
              className="flex-1 border rounded-lg px-4 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 disabled:bg-gray-100"
            />
            {!emailVerified ? (
              <button
                type="button"
                onClick={handleSendEmailOtp}
                disabled={emailOtpLoading || !form.email.trim()}
                className="bg-navy text-white text-xs font-semibold px-4 py-2 rounded-lg hover:opacity-90 disabled:opacity-50"
              >
                {emailOtpLoading ? "Sending..." : emailOtpSent ? "Resend OTP" : "Send OTP"}
              </button>
            ) : (
              <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1">
                ✓ Verified
              </span>
            )}
          </div>

          {emailOtpSent && !emailVerified && (
            <div className="flex gap-2 pt-1">
              <input
                value={emailOtpCode}
                onChange={(e) => setEmailOtpCode(e.target.value)}
                placeholder="Enter 6-digit Email OTP"
                className="flex-1 border rounded-lg px-4 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
              />
              <button
                type="button"
                onClick={handleVerifyEmailOtp}
                disabled={emailOtpLoading || !emailOtpCode.trim()}
                className="bg-emerald-600 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50"
              >
                Verify Code
              </button>
            </div>
          )}
          {emailOtpMsg && (
            <p className={`text-xs ${emailVerified ? "text-emerald-600 font-medium" : "text-amber-700"}`}>
              {emailOtpMsg}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            placeholder="e.g. 9876543210"
            required
            className="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
            Address <span className="text-red-500">*</span>
          </label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Full Address"
            required
            rows={3}
            className="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
          />
        </div>

        {/* Username */}
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
            Choose a Username <span className="text-red-500">*</span>
          </label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            required
            className="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
          />
        </div>

        {/* Passwords */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
              className="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
            />
          </div>
        </div>

        {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

        <button
          type="submit"
          disabled={submitting || !emailVerified}
          className="w-full bg-saffron text-navy font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-all shadow-xs disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          {submitting ? "Registering…" : "Complete Registration"}
        </button>
      </form>
    </div>
  );
}
