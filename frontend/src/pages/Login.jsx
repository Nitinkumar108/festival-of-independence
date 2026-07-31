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
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await api.post("/auth/admin/login", form);
      login({ token: res.data.token, role: "admin", user: res.data.admin });
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        placeholder="Admin Email"
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
        className="w-full bg-navy text-white font-semibold px-6 py-3 rounded hover:opacity-90 disabled:opacity-60"
      >
        {submitting ? "Logging in…" : "Login"}
      </button>
    </form>
  );
}
