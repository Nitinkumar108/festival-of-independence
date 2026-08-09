const jwt = require("jsonwebtoken");

function getTokenFromHeader(req) {
  const header = req.headers.authorization || "";
  return header.startsWith("Bearer ") ? header.split(" ")[1] : null;
}

/** Verifies the JWT and attaches { id, role } to req.user */
function protect(req, res, next) {
  const token = getTokenFromHeader(req);
  if (!token) return res.status(401).json({ message: "Not authorized, no token provided." });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ message: "Not authorized, token invalid or expired." });
  }
}

/** Optionally verifies JWT if provided */
function optionalAuth(req, res, next) {
  const token = getTokenFromHeader(req);
  if (token) {
    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      // ignore invalid token in optional auth
    }
  }
  next();
}

/** Restricts a route to a specific role: "student" or "admin" */
function requireRole(role) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ message: "Forbidden: insufficient permissions." });
    }
    next();
  };
}

/** Restricts a route strictly to Super Admin */
function requireSuperAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin" || req.user.adminRole !== "SuperAdmin") {
    return res.status(403).json({ message: "Forbidden: Super Admin access required." });
  }
  next();
}

module.exports = { protect, optionalAuth, requireRole, requireSuperAdmin };
