const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const passport = require("passport");

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  // not authenticated
  res.redirect("/login");
}

router.get("/sign-up", authController.showSignUpForm);

router.post("/sign-up", authController.handleSignUp);

router.get("/login", authController.showLogin);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  })
);

router.get("/dashboard", ensureAuthenticated, authController.showDashboard);

router.get("/logout", authController.logout);

module.exports = router;
