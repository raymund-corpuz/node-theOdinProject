// const http = require("http");

// const server = http.createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "text/plain" });
//   res.end("Hello World from Node.js");
// });

// server.listen(3000, () => {
//   console.log("Server is running at http://localhost:3000");
// });

// const http = require("http");

// const server = http.createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "text/plain" });
//   res.end("Hello World to you User");
// });

// server.listen(3000, () => {
//   console.log("Server is running at http://localhost:3000");
// });

const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello World again User...");
});

server.listen(3000, () => {
  console.log("Server is runnint at http://localhost:3000");
});
