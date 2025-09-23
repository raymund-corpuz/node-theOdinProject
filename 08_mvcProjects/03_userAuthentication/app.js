const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");

const PORT = process.env.PORT || 8080;

app.set("view engine", "ejs");

app.use("/register", authRoutes);
app.use("/login", authRoutes);
app.use("/logout", authRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is Running at http://localhost:${PORT}`);
});
