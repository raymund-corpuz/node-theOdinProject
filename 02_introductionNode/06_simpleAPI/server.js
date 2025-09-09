const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/api/users") {
    const users = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 3, name: "Charlie" },
    ];

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found!");
  }
});

server.listen(4000, () => {
  console.log("Server is Running http://localhost:4000/api/users");
});
