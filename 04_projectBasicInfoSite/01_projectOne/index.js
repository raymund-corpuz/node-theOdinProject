// const http = require("http");
// const fs = require("fs");
// const path = require("path");

// const PORT = process.env.PORT || 3000;

// const server = http.createServer((req, res) => {
//   let filePath = req.url === "/" ? "/index.html" : req.url;

//   let fullPath = path.join(__dirname, "public", filePath);

//   fs.readFile(fullPath, (req, res) => {
//     if (err) {
//       console.error("Error reading file:", err);
//       res.writeHead(404, { "Content-Type": "text/plain" });
//     } else if (req.url === "/about") {
//       res.writeHead(200, { "Content-Type": "text/plain" });
//       res.render("./about.html");
//     } else if (req.url === "/contact-me") {
//       res.writeHead(200, { "Content-Type": "text/plain" });
//       res.render("./contact-me.html");
//     } else {
//       res.writeHead(404, { "Content-Type": "text/plain" });
//       res.render("./404.html");
//     }
//   });
// });

// server.listen(PORT, () => {
//   console.log(`🚀Server is running at http://localhost:${PORT}`);
// });

const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  let filePath = "./public";

  if (req.url === "/") {
    filePath += "/index.html";
  } else if (req.url === "/about") {
    filePath += "/about.html";
  } else if (req.url === "/contact") {
    filePath += "/contact-me.html";
  } else {
    filePath += "404.html";
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Server Error");
      return;
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
});

server.listen(8080, () => {
  console.log(`🚀Server is running at http://localhost:8080`);
});
