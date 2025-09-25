const express = require("express");
const path = require("path");
const messageRoutes = require("./routes/messageRoutes");
const moethodOverride = require("method-override"); //added

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(moethodOverride("_method")); // added

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", messageRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
