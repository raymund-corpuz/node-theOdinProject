const express = require("express");
const passport = require("passport");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/", (req, res) => res.render("index"));
router.get("/sign-up", authController.showSignUpForm);
router.post("/sign-up", authController.handleSignUp);
router.get("/login", authController.showLogin);
// router.post("/login", passport.authenticate(local));

// ========== CORRECT =========================== //
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true, // optional, if you use connect-flash
  })
);
router.get("/logout", authController.logout);

module.exports = router;
