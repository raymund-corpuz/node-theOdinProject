// const express = require("express");
// const app = express();

// const PORT = process.env.PORT || 3000;

// app.get("/", (req, res) => {
//   res.send("Welcome to Express!");
// });

// app.get("/about", (req, res) => {
//   res.send("Welcome to About Express");
// });

// app.listen(PORT, () => {
//   console.log(`Server is Running at http://localhost:${PORT}`);
// });

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Welcome to Express");
});

app.get("/about", (req, res) => {
  res.json({ message: "About Page" });
});

app.listen(PORT, () => {
  console.log(`Server is Running at http://localhost:${PORT}`);
});
