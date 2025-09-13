const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  let filePath = "";

  if (req.url === "/") {
    filePath = "/index.html";
  } else if (req.url === "/about") {
    filePath = "about.html";
  } else if (req.url === "/contact") {
    filePath = "contact.html";
  } else if (req.url === "/shop") {
    filePath = "shop.html";
  } else {
    filePath = req.url;
  }
  let fullPath = path.join(__dirname, "public", filePath);

  fs.readFile(fullPath, (err, data) => {
    if (err) {
      console.error("Error Occured", err);
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Bad request");
      return;
    }
    let ext = path.extname(fullPath).toLowerCase();
    let contentType = "text/html";

    if (ext === ".css") contentType = "text/css";
    if (ext === ".js") contentType = "application/javascript";

    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
});

server.listen(4000, () => {
  console.log("Server is running at http://localhost:4000");
});
