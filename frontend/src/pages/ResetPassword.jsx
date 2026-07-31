import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import api from "../api/axios.js";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!token) {
      setError("Reset token is missing from the link.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await api.post("/auth/reset-password", { token, password });
      setMessage(res.data.message || "Password has been reset successfully.");
      
      // Auto redirect after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password. The link may have expired.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
        <h1 className="text-3xl font-bold text-navy mb-4 text-center">Reset Password</h1>
        
        {!token ? (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded text-sm text-center">
            <p className="font-semibold mb-2">Invalid Reset Link</p>
            <p>This password reset link is invalid or incomplete. Please request a new link.</p>
            <div className="mt-4">
              <Link to="/forgot-password" className="text-navy font-bold hover:underline">
                Request New Link
              </Link>
            </div>
          </div>
        ) : message ? (
          <div className="p-4 bg-cream border border-gold/20 text-navy rounded text-sm text-center">
            <p className="font-semibold text-gold mb-2">Success!</p>
            <p>{message}</p>
            <p className="text-xs text-gray-500 mt-2">Redirecting to login page in 3 seconds...</p>
            <div className="mt-4">
              <Link to="/login" className="text-saffron font-bold hover:underline">
                Go to Login Now
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="pass" className="block text-sm font-semibold text-navy mb-1">
                New Password
              </label>
              <input
                id="pass"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password (min. 6 chars)"
                required
                className="w-full border rounded px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-saffron focus:border-saffron"
              />
            </div>

            <div>
              <label htmlFor="confirmPass" className="block text-sm font-semibold text-navy mb-1">
                Confirm New Password
              </label>
              <input
                id="confirmPass"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
                className="w-full border rounded px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-saffron focus:border-saffron"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-saffron text-navy font-semibold px-6 py-3 rounded hover:opacity-90 disabled:opacity-60 transition"
            >
              {submitting ? "Resetting…" : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
