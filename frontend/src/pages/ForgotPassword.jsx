import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");
    setSubmitting(true);

    try {
      const res = await api.post("/auth/forgot-password", { email });
      setMessage(res.data.message || "If that email is registered, a password reset link has been sent.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
        <h1 className="text-3xl font-bold text-navy mb-4 text-center">Forgot Password</h1>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Enter your email address below and we'll send you a link to reset your password.
        </p>

        {message ? (
          <div className="mb-6 p-4 bg-cream border border-gold/20 text-navy rounded text-sm text-center">
            <p className="font-semibold text-gold mb-2">Request Received</p>
            <p>{message}</p>
            <div className="mt-6">
              <Link
                to="/login"
                className="inline-block bg-navy text-white text-xs font-semibold px-4 py-2 rounded hover:opacity-90"
              >
                Back to Login
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-navy mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
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
              {submitting ? "Sending Link…" : "Send Reset Link"}
            </button>

            <p className="text-sm text-gray-600 text-center mt-4">
              Remember your password?{" "}
              <Link to="/login" className="text-saffron font-medium hover:underline">
                Login
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
