const express = require("express");

const app = express();

const PORT = process.env.PORT || 4000;

// ===== Middleware =========
function loggerMiddleware(req, res, next) {
  console.log(`${req.method} ${req.url}`);

  req.startTime = Date.now();

  next();
}

app.use(loggerMiddleware);

// ========== Controllers ==============
function helloController(req, res) {
  res.send("Hello World");
}

// ========== Route ==================

app.get("/hello", helloController);

app.get("/time", (req, res) => {
  res.send(`Request started at: ${req.startTime}`);
});

// ========= Start Server ===============
app.listen(PORT, () => {
  console.log(`🚀 Server is Running at http://localhost:${PORT}`);
});
