const express = require("express");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");

app.use("/", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT} 🚀`);
});
