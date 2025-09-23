const express = require("express");
const mongoose = require("mongoose");
const path = require("path"); //missing
const productRoutes = require("./routes/productRoutes");
const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// missing
app.set("view engine", "ejs");
app.set("view", path.join(__dirname, "views"));

const MONGO_URI = "mongoo_username/password";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(`Connected to Database`);
  })
  .catch((err) => {
    console.error(err);
  });

app.use("/", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is Running at http://localhost:${PORT}`);
});
