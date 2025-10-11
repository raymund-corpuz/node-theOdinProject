const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");
const passport = require("passport");

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

//show signup
router.get("/sign-up", userControllers.showSignUpForm);
// post signup
router.post("/sign-up", userControllers.handleSignUp);
//show login
router.get("/login", userControllers.showLoginForm);

//post login
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  }),
  (req, res) => {
    console.log("Login success: ", req.user);
  }
);

// show dashboard
router.get("/dashboard", ensureAuthenticated, userControllers.showDashboard);

//logout
router.get("/logout", userControllers.logout);

module.exports = router;
