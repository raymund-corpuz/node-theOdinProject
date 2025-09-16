// const express = require("express");
// const app = express();

// //app.set("view engine", "ejs");
// app.set("view engine", "ejs");

// app.get("/", (req, res) => {
//   res.render("index");
// });

// app.listen(8080, () => {
//   console.log("Server is running at http://localhost:8080");
// });

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Blog = require("./models/blog");

app.set("view engine", "ejs");

const db_URI =
  "mongodb+srv://raymundcorpuz86_db_user:ray123456789@nodetuts.7pmkm7g.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=nodetuts";

mongoose
  .connect(db_URI)
  .then((result) => {
    app.listen(8080, () => {
      console.log("Server is running at http://localhost:8080");
    });

    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/create", (req, res) => {
  res.render("create");
});
