const express = require("express");
const authControllers = require("../controllers/authController");
const router = express.Router();

router.get("/register", authControllers.registerGet);
router.post(
  "/register",
  authControllers.registerValidator,
  authControllers.registerPost
);
router.get("/login", authControllers.loginGet);

router.post(
  "/login",
  authControllers.loginValidator,
  authControllers.loginPost
);
router.get("/logout", authControllers.logout);

module.exports = router;
