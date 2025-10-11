// testApp.js
const express = require("express");
const bodyParser = require("body-parser");
const authController = require("./controllers/authController");
const passport = require("./middleware/passportConfig");
const session = require("express-session");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: "yourSecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());
// Temporary test endpoints
app.get("/sign-up", authController.showSignUpForm);
app.post("/sign-up", authController.handleSignUp);
app.get("/login", authController.showLogin);
app.get("/logout", authController.logout);

app.listen(8080, () =>
  console.log("🚀 Test server running at http://localhost:8080")
);
