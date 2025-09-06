const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome to the Home Page");
  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome to the About Page");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Page not found");
  }
});

server.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});
