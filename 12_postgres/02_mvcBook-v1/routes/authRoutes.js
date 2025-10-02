const express = require("express");
const authControllers = require("../controllers/authControllers");
const router = express.Router();

router.get("/register", authControllers.registerGet);

router.post(
  "/register",
  authControllers.registerValidation,
  authControllers.registerPost
);

router.get("/login", authControllers.loginGet);

router.post(
  "/login",
  authControllers.loginValidation,
  authControllers.loginPost
);

router.get("/logout", authControllers.logout);

module.exports = router;
