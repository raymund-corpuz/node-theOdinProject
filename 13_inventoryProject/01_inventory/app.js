const express = require("express");
const path = require("path");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:{PORT}`);
});
