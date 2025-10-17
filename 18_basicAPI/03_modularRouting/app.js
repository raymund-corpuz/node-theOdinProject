const express = require("express");
const app = express();
const PORT = 4000;
const userRoutes = require("./routes/users");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//import users routes
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to API" });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
