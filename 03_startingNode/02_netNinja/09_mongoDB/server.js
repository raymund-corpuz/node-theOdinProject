const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.get("/", (req, res) => {
  res.send("MongoDB connection test app 🚀");
});

app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});
