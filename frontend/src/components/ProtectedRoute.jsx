import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

/** Wrap any route element: <ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute> */
export default function ProtectedRoute({ role, children }) {
  const { token, role: currentRole } = useAuth();

  if (!token) return <Navigate to="/login" replace />;
  if (role && currentRole !== role) return <Navigate to="/login" replace />;

  return children;
}
