const express = require("express");
const postRoutes = require("./routes/postRoutes");
const app = express();

const PORT = process.env.PORT || 8080;

app.set("view engine", "ejs");

app.use("/posts", postRoutes);

app.get("/", (req, res) => {
  res.redirect("/posts");
});

app.listen(PORT, () => {
  console.log(`🚀 Server is Running at http://localhost:${PORT}`);
});
