const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, "index.html");

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("File Not Found!");
    } else {
      res.writeHead(200, { "Conent-Type": "text/html" });
      res.end(data);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is Runnning at http://localhost:${PORT}`);
});
