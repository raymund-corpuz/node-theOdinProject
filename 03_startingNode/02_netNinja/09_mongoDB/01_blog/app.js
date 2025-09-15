const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Blog = require("./models/blog");

//connect to mongoDB
const dB_URI =
  "mongodb+srv://raymundcorpuz86_db_user:ray123456789@nodetuts.7pmkm7g.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=nodetuts";

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

// app.get("/add-blog", (req, res) => {
//   const blog = new Blog({
//     title: "Harley Butter",
//     snippet: "About Harley",
//     body: "Harley Butter and the Philosopher Stone",
//   });

//   blog
//     .save()
//     .then((results) => {
//       res.send(results);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/all-blog", (req, res) => {
//   Blog.find()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/single-blog", (req, res) => {
//   Blog.findById("68c7bd60bcb1fa3bfd404fc6")
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

////////////////////////
//Render EJS FILES   //
//////////////////////

//middlewares
app.use(express.static("public"));

//routes

app.get("/", (req, res) => {
  res.redirect("/blog");
});

// app.use((req, res, next) => {
//   console.log("in the next middleware");
//   next();
// });

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//blog routes
app.get("/blog", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
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
