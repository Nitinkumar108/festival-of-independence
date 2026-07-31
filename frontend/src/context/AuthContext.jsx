import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("foi_token"));
  const [role, setRole] = useState(localStorage.getItem("foi_role")); // "student" | "admin"
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("foi_user");
    return stored ? JSON.parse(stored) : null;
  });

  function login({ token, role, user }) {
    localStorage.setItem("foi_token", token);
    localStorage.setItem("foi_role", role);
    localStorage.setItem("foi_user", JSON.stringify(user));
    setToken(token);
    setRole(role);
    setUser(user);
  }

  function logout() {
    localStorage.removeItem("foi_token");
    localStorage.removeItem("foi_role");
    localStorage.removeItem("foi_user");
    setToken(null);
    setRole(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ token, role, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
