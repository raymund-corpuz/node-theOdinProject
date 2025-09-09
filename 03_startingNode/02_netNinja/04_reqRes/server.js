const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const path = req.url.replace(/\/$/, "");

  res.setHeader("Content-Type", "text/plain; charset=utf-8");

  if (path === "" || path === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("🏠Welcome to Home Page");
  } else if (path === "/about") {
    res.statusCode = 200;
    res.end("ℹ️Welcome to About Page");
  } else if (path === "/contact") {
    res.statusCode = 200;
    res.end("☎️Welcome to Contact Page");
  } else {
    res.statusCode = 404;
    res.end("Page Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Server is Runnint at http://localhost:${PORT}`);
});
