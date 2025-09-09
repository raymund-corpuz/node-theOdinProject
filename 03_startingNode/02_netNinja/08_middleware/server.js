const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};

app.use(logger);

app.get("/", (req, res) => {
  res.send("🏠Home Page");
});

app.get("/about", (req, res) => {
  res.send("ℹ️ About Page");
});

app.listen(PORT, () => {
  console.log(`Server is Running http://localhost:${PORT}`);
});
