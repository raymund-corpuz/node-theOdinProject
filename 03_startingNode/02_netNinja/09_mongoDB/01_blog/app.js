const express = require("express");
const app = express();
const mongoose = require("mongoose");

//connect to mongoDB
const dB_URI =
  "mongodb+srv://raymundcorpuz86_db_user:ray123456789@nodetuts.7pmkm7g.mongodb.net/?retryWrites=true&w=majority&appName=nodetuts";

mongoose
  .connect(dB_URI)
  .then((results) => {
    app.listen(8080, () => {
      console.log("Server is running at http://localhost:8080");
    });

    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

//register view engine
app.set("view engine", "ejs");

////////////////////////
//Render EJS FILES   //
//////////////////////

app.use(express.static("public"));

app.get("/", (req, res) => {
  const blogs = [
    {
      title: "Youshi finds eggs",
      snippet: "Lorem ispsum folor sit amet consectetur",
    },
    {
      title: "Mario finds star",
      snippet: "Lorem ispsum folor sit amet consectetur",
    },
    {
      title: "How to defeat browser",
      snippet: "Lorem ispsum folor sit amet consectetur",
    },
  ];

  res.render("index", { title: "Home", blogs });
});

// app.use((req, res, next) => {
//   console.log("in the next middleware");
//   next();
// });

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new Blog" });
});

app.use((req, res) => {
  res.render("404", { title: "404" });
});

//////////////////////////
// Render HTML FILES   //
////////////////////////
// app.get("/", (req, res) => {
//     res.sendFile("./views/index.html", { root: __dirname });
//   res.render("index");
// });

// app.get("/about", (req, res) => {
//   res.sendFile("./views/about.html", { root: __dirname });
// });

// app.get("/contact", (req, res) => {
//   res.sendFile("./views/contact.html", { root: __dirname });
// });

// app.use((req, res) => {
//   res.status(404).sendFile("./views/404.html", { root: __dirname });
// });
