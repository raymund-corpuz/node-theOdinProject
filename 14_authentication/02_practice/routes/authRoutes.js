const express = require("express");
const passport = require("passport");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/sign-up", authController.showSignUpForm);
router.post("/sign-up", authController.handleSignUp);
router.get("/login", authController.showLogin);
router.post("/login", passport.authenticate(local));
router.get("/logout", authController.logout);

module.exports = router;
