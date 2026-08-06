import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

const DEFAULT_COLLEGES_LIST = [
  // 40 Calcutta University affiliated colleges from Kolkata College Visit Plan
  "Umeschandra College",
  "Vidyasagar College",
  "City College",
  "Ananda Mohan College",
  "City College of Commerce & B.A.",
  "Chittaranjan College",
  "Surendranath College",
  "Bangabasi College",
  "Acharya Girish Chandra Bose College",
  "Goenka College of Commerce & B.A.",
  "Scottish Church College",
  "Seth Anandram Jaipuria College",
  "Maharaja Manindra Chandra College",
  "Maharaja Srischandra College",
  "Shyambazar Law College",
  "Sir Gurudas Mahavidyalaya",
  "Government College of Art & Craft",
  "Acharya Jagadish Chandra Bose College",
  "The Bhawanipur Education Society College",
  "Asutosh College",
  "Charuchandra College",
  "Heramba Chandra College",
  "Prafulla Chandra College",
  "Bengal Music College",
  "Jogesh Chandra Chaudhuri College",
  "Vijaygarh Jyotish Ray College",
  "Netaji Nagar College",
  "Sammilani Mahavidyalaya",
  "K.K. Das College",
  "Dinabandhu Andrews College",
  "Baruipur College",
  "Behala College",
  "Rabin Mukherjee College",
  "Kishore Bharati Bhagini Nivedita College",
  "Vivekananda College (Thakurpukur)",
  "Shishuram Das College",
  "Sarsuna College",
  "New Alipore College",
  "Shibpur Dinobundhoo Institution (College)",
  "Dr. Kanailal Bhattacharyya College",

  // 5 Medical Colleges
  "Calcutta Medical College",
  "IPGMER (Institute of Post Graduate Medical Education and Research / SSKM Hospital)",
  "Nilratan Sircar (NRS) Medical College and Hospital",
  "R.G. Kar Medical College and Hospital",
  "Calcutta National Medical College and Hospital (CNMC)",

  // 9 Universities & Other Options
  "Indian Statistical Institute (ISI)",
  "Indian Institute of Engineering Science and Technology (IIEST), Shibpur",
  "Rabindra Bharati University",
  "Jadavpur University",
  "Brainware University",
  "Adamas University",
  "Presidency University",
  "Other college under Calcutta University",
  "Other Colleges / Universities"
];

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [colleges, setColleges] = useState([]);
  const [form, setForm] = useState({
    fullName: "",
    collegeId: "",
    customCollegeName: "",
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
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setColleges(res.data);
        }
      })
      .catch(() => {});
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

    if (!form.fullName.trim()) return setError("Full Name is required.");
    if (!form.collegeId) return setError("Please select your college or institution.");
    if (!form.email.trim()) return setError("Email Address is required.");
    if (!emailVerified) return setError("Please verify your Email address with OTP before registering.");
    if (!form.phoneNumber.trim()) return setError("Phone Number is required.");
    if (!form.address.trim()) return setError("Address is required.");
    if (!form.username.trim()) return setError("Username is required.");
    if (!form.password) return setError("Password is required.");
    if (!form.confirmPassword) return setError("Confirm Password is required.");
    if (form.password !== form.confirmPassword) return setError("Passwords do not match.");

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
    <div className="w-full min-h-screen bg-slate-50/60 py-12 sm:py-16 px-4 font-sans text-slate-800">
      <div className="max-w-xl mx-auto bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        
        {/* Header Title */}
        <div className="space-y-1 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-black text-navy tracking-tight">Student Registration</h1>
          <p className="text-xs text-gray-500 font-medium">
            Already registered?{" "}
            <Link to="/login" className="text-saffron font-bold hover:underline">
              Login here
            </Link>
          </p>
        </div>

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
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-medium text-navy placeholder-gray-400 focus:outline-none focus:border-saffron"
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
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-medium text-navy focus:outline-none focus:border-saffron"
            >
              <option value="">-- Select College / Institution --</option>
              {(colleges.length > 0
                ? colleges
                : DEFAULT_COLLEGES_LIST.map((name) => ({ id: name, name }))
              ).map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Email Verification Section */}
          <div className="border border-gray-200 rounded-2xl p-4 bg-gray-50/70 space-y-2">
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
                className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium text-navy focus:outline-none focus:border-saffron disabled:bg-gray-100"
              />
              {!emailVerified ? (
                <button
                  type="button"
                  onClick={handleSendEmailOtp}
                  disabled={emailOtpLoading || !form.email.trim()}
                  className="bg-navy text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-saffron hover:text-navy transition-all disabled:opacity-50 flex-shrink-0"
                >
                  {emailOtpLoading ? "Sending..." : emailOtpSent ? "Resend OTP" : "Send OTP"}
                </button>
              ) : (
                <span className="bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold px-3.5 py-2.5 rounded-xl flex items-center gap-1">
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
                  className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium text-navy focus:outline-none focus:border-saffron"
                />
                <button
                  type="button"
                  onClick={handleVerifyEmailOtp}
                  disabled={emailOtpLoading || !emailOtpCode.trim()}
                  className="bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-emerald-700 disabled:opacity-50 flex-shrink-0"
                >
                  Verify Code
                </button>
              </div>
            )}
            {emailOtpMsg && (
              <p className={`text-xs ${emailVerified ? "text-emerald-700 font-bold" : "text-amber-700 font-medium"}`}>
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
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-medium text-navy placeholder-gray-400 focus:outline-none focus:border-saffron"
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
              rows={2}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-medium text-navy placeholder-gray-400 focus:outline-none focus:border-saffron"
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
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-medium text-navy placeholder-gray-400 focus:outline-none focus:border-saffron"
            />
          </div>

          {/* Passwords */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-medium text-navy placeholder-gray-400 focus:outline-none focus:border-saffron"
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
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-medium text-navy placeholder-gray-400 focus:outline-none focus:border-saffron"
              />
            </div>
          </div>

          {error && <p className="text-xs font-bold text-red-600 bg-red-50 p-3 rounded-xl text-center border border-red-200">{error}</p>}

          <button
            type="submit"
            disabled={submitting || !emailVerified}
            className="w-full bg-saffron text-navy font-black py-3.5 rounded-xl hover:bg-indiagreen hover:text-white transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {submitting ? "Registering…" : "Complete Registration"}
          </button>
        </form>

      </div>
    </div>
  );
}
