const express = require("express");
const path = require("path");
const { Pool } = require("pg");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  database: "testauth_db",
  password: "111111",
  port: 5432,
});

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(
  session({
    secret: "cats",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 },
  })
);

app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/sign-up", (req, res) => {
  res.render("sign-up-form");
});

app.post("/sign-up", async (req, res, next) => {
  try {
    await pool.query("INSERT INTO users (username, password) VALUES ($1,$2)", [
      req.body.username,
      req.body.password,
    ]);
    res.redirect("/");
  } catch (error) {
    return next(error);
  }
});

app.listen(3000, () => {
  console.log(`🚀 Server is running at http://localhost:3000`);
});
