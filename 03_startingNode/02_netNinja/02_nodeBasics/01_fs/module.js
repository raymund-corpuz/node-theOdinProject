const fs = require("fs");

//Read Files
// fs.readFile("./someData/data.txt", (err, data) => {
//   if (err) {
//     console.error("Can't read the data.", err);
//   }

//   console.log(data.toString());
// });

//Write Files
// fs.writeFile("./someData/data.txt", "hello, Ninjas", (err) => {
//   if (err) {
//     console.error("Can't write inside the file");
//   }

//   console.log("Data is Updated!");
// });

//delete files

if (!fs.existsSync("./assets")) {
  fs.mkdir("./assets", (err) => {
    if (err) {
      console.error(`Can't create a folder`, err);
    }

    console.log("Folder is created");
  });
} else {
  fs.rmdir("./assets", (err) => {
    if (err) {
      console.error(`Can't delete the folder`, err);
    }
    console.log(" Folder is removed");
  });
}
