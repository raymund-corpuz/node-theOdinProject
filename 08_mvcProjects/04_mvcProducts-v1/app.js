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

/*
// =============== START =================================
// app.js
require("dotenv").config(); // optional, remove if you don't want env files
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/productsDB";

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// routes — mounted at /products (so routes in productRoutes should be relative: '/' and '/:id')
app.use("/products", productRoutes);

// root redirect
app.get("/", (req, res) => res.redirect("/products"));

// start server AFTER connecting to MongoDB using async/await
async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // fail fast if DB connection fails
  }
}

start();
*/
