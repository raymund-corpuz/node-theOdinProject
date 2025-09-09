// const fs = require("fs");
// const path = require("path");

// const filePath = path.join(__dirname, "data.txt");

// fs.readFile(filePath, "utf8", (err, data) => {
//   if (err) {
//     console.error("Error occured", err.message);
//     return;
//   }
//   console.log("File contents: \n", data);
// });

const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "data.txt");

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.err("Error occured", err.message);
    return;
  }
  console.log("File content:\n", data);
});
