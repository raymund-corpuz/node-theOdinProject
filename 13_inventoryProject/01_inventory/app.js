const express = require("express");
const path = require("path");
const categoryRoutes = require("./routes/categoryRoutes");
const itemRoutes = require("./routes/itemRoutes");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", categoryRoutes);
app.use("/items", itemRoutes);
// app.use((req, res) => {
//   res.status(404).send("Page Not Found! ❌");
// });

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
