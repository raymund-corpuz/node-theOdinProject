const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { username: "Ray" });
});

// app.get("/about", (req, res) => {
//   const navLinks = ["Home", "Services", "About", "Contact"];
//   res.render("about", { links: navLinks, username: "Ray" });
// });

app.get("/about", (req, res) => {
  const navLinks = ["Home", "About", "Contact", "Services"];
  res.render("about", { links: navLinks, username: "Ray" });
});

app.listen(PORT, () => {
  console.log(`Server is Running http://localhost:${PORT}`);
});
