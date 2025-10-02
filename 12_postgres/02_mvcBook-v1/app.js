const express = require("express");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// app.use(
//   session({
//     secret: "your_secret_key",
//     resave: false,
//     saveUninitialized: false,
//   })
// );

app.use(
  session({
    secret: "superSecretKey", // use env variable in production
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true, // prevents client-side JS from reading cookie
      secure: false, // set true if using HTTPS
      maxAge: 1000 * 60 * 60, // 1 hour
    },
  })
);

// ===== Authentication Middleware ===== //
function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect("/auth/login");
}

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
