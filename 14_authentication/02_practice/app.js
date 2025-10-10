const express = require("express"); //correct
const authRoutes = require("./routes/authRoutes"); //correct
const session = require("express-session"); //correct
const path = require("path"); //correct
const passport = require("passport"); // missing
// ====== Rename ================ //
// const authenticateUser = require("./middleware/passportConfig");
const configurePassport = require("./middleware/passportConfig");

const app = express(); //correct

// 🧩 Configure Passport Strategies - missing
configurePassport(passport);

// set view engine (EJS)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middleware: express.urlencoded()
app.use(express.urlencoded({ extended: false }));

// session config
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 },
  })
);
// initialize passport + session
app.use(passport.initialize());
app.use(passport.session());

// global middleware to expose req.user
// app.use(authenticateUser);
// use authRoutes
app.use("/", authRoutes);
// define / route → render index.ejs with req.user
// remove ===> app.use("/", authenticateUser, authRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
