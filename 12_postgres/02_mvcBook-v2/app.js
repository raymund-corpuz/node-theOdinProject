const express = require("express");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const session = require("express-session");
const methodOverride = require("method-override");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(
  session({
    secret: "your_secret_key", // Used to sign the session ID cookie
    resave: false, // Don't save session if not modified
    saveUninitialized: false, // Don't save new sessions that have not been modified
    cookie: { maxAge: 3600000 }, // Session cookie expiration in milliseconds (e.g., 1 hour)
  })
);
app.use(methodOverride("_method"));

function isAuth(req, res, next) {
  if (!req.session.user) {
    return res.status(401).send("❌ You must log in first");
  }
  next();
}

app.use("/auth", authRoutes);
app.use("/", isAuth, bookRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
