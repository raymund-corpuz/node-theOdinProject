const express = require("express");

const PORT = process.env.PORT || 8080;

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to my site");
});

app.get("/about", (req, res) => {
  res.send("Welcome to about page");
});

app.post("/contact", (req, res) => {
  res.send("Form submitted");
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running at port http://localhost:${PORT}`);
});
