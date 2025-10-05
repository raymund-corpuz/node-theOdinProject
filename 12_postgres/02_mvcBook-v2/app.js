// const express = require("express");
// const path = require("path");
// const bookRoutes = require("./routes/bookRoutes");
// const authRoutes = require("./routes/authRoutes");
// const session = require("express-session");
// const methodOverride = require("method-override");

// const app = express();
// const PORT = process.env.PORT || 8080;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// app.use(methodOverride("_method"));

// app.use(
//   session({
//     secret: "your-secret-key",
//     resave: false,
//     saveUninitialized: false,
//     cookie: { maxAge: 3600000 },
//   })
// );

// function isAuth(req, res, next) {
//   if (!req.session.user) {
//     return res.redirect("/auth/login");
//   }
//   next();
// }

// app.use("/auth", authRoutes);
// app.use("/", isAuth, bookRoutes);

// //404 handler
// app.use((req, res) => {
//   res.status(404).send("404 - Page not found");
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Server is running at http://localhost:${PORT}`);
// });

const express = require("express");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const methodOverride = require("method-override");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(methodOverride("_method"));
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 },
  })
);

function isAuth(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/auth/login");
  }
  next();
}

app.use("/auth", authRoutes);
app.use("/", isAuth, bookRoutes);

app.use((req, res) => {
  res.status(404).send("404 - Page Not Found");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
