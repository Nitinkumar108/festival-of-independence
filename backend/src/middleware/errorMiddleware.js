// Keep this as the LAST app.use() in server.js
function errorMiddleware(err, req, res, next) {
  console.error(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || "Something went wrong on the server.",
  });
}

module.exports = errorMiddleware;
