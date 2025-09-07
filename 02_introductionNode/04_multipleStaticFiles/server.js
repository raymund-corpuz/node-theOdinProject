// const http = require("http");
// const fs = require("fs");
// const path = require("path");

// const server = http.createServer((req, res) => {
//   let filePath = req.url === "/" ? "/index.html" : req.url;
//   let fullPath = path.join(__dirname, "public", filePath);

//   fs.readFile(fullPath, (err, data) => {
//     if (err) {
//       res.writeHead(404, { "Content-Type": "text/plain" });
//       res.end("File Not Found!");
//     } else {
//       const ext = path.extname(fullPath);
//       let contentType = "text/html";

//       if (ext === ".css") contentType = "text/css";
//       if (ext === ".js") contentType = "application/javascript";

//       res.writeHead(200, { "Content-Type": contentType });
//       res.end(data);
//     }
//   });
// });

// server.listen(3000, () => {
//   console.log("Server is Running at http://localhost:3000");
// });

const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  let filePath = req.url === "/" ? "/index.html" : req.url;
  let fullPath = path.join(__dirname, "public", filePath);

  fs.readFile(fullPath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("File Not Found!");
    } else {
      const ext = path.extname(fullPath);
      let contentType = "text/html";

      if (ext === ".css") contentType = "text/css";
      if (ext === ".js") contentType = "application/javascript";

      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    }
  });
});

server.listen(3000, () => {
  console.log("Server is running http://localhost:3000");
});
