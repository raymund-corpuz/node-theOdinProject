const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  let filePath = "./pages";
  let fullPath = path.join(__dirname, filePath);

  if (req.url === "/") {
    filePath += "/index.html";
  } else if (req.url === "/about") {
    filePath += "/about.html";
  } else if (req.url === "/contact") {
    filePath += "/contact.html";
  } else {
    filePath += "/404.html";
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error occured");
      return;
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
});

server.listen(3000, () => {
  console.log(`Server is running at http://localhost:3000`);
});
