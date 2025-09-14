const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  let filePath = "./views/";

  if (req.url === "/") {
    filePath += "index.html";
  } else if (req.url === "/about") {
    filePath += "about.html";
  } else if (req.url === "/contact") {
    filePath += "contact.html";
  } else if (req.url === "/shop") {
    filePath += "shop.html";
  } else {
    filePath += "404.html";
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error("Error Occured", err);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Server Error");
    }

    const ext = path.extname(filePath).toLowerCase();
    let contentType = "text/html";

    if (ext === ".css") contentType = "text/css";
    if (ext === "js") contentType = "application/javascript";

    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
});

server.listen(8080, () => {
  console.log(`Server is Running at http://localhost:8080`);
});
