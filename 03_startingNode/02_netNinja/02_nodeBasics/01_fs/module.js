const fs = require("fs");

fs.readFile("./someData/data.txt", (err, data) => {
  if (err) {
    console.error("Can't read the data.", err);
  }

  console.log(data.toString());
});
