const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const productRoutes = require("./routes/productRoutes");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const MONGO_URI = `<username>/ <password></password>`;

//connect to Mongo DB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(`Connected to Mongo DB`);
  })
  .catch((err) => {
    console.error(err);
  });

app.use("/", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is Running at http://localhost:${PORT}`);
});
