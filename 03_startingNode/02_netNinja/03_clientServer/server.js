// const http = require("http");

// const PORT = process.env.PORT || 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/plain");
//   res.end("Hello from server!");
// });

// server.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}/`);
// });

const http = require("http");
const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello, Node");
});

server.listen(PORT, () => {
  console.log(`Server is Running http://localhost:${PORT}/`);
});
