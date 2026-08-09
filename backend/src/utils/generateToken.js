const jwt = require("jsonwebtoken");

/**
 * Signs a JWT for either a student or an admin.
 * `role` is embedded in the payload so middleware can enforce
 * strict separation between the Student and Admin areas of the site.
 */
function generateToken({ id, role, adminRole }) {
  const payload = { id, role };
  if (adminRole) payload.adminRole = adminRole;
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

module.exports = generateToken;
