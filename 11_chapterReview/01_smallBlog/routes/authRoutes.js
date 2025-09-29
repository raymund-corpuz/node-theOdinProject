const express = require("express");
const authController = require("../controllers/authControllers");
const router = express.Router();

router.get("/register", authController.showRegister);

router.post(
  "/register",
  authController.registerValidation,
  authController.registerUser
);

router.get("/login", authController.showLogin);

router.post("/login", authController.loginValidation, authController.loginUser);

router.get("/logout", authController.logout);

module.exports = router;
