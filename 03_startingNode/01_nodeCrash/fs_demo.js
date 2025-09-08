const fs = require("fs");
const path = require("path");

//Create folder
// fs.mkdir(path.join(__dirname, "/test"), {}, (err) => {
//   if (err) throw err;
//   console.log("Folder Created");
// });

//Create and write to file
fs.writeFile(
  path.join(__dirname, "/test", "hello.txt"),
  "Hello World",
  (err) => {
    if (err) throw err;
    console.log("File Written ");
  }
);

//File Append

// fs.appendFile(
//   path.join(__dirname, "/test", "hello.txt"),
//   " I Love JavaScript",
//   (err) => {
//     if (err) throw err;
//     console.log("File is written to...");
//   }
// );

fs.appendFile(
  path.join(__dirname, "/test", "hello.txt"),
  " I Love Node Js",
  (err) => {
    if (err) throw err;
    console.log("File is written to...");
  }
);
