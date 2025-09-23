const express = require("express");
const authController = require("../controllers/authControllers");
const router = express.Router();

router.get("/register", authController.showUsers);

router.post("/register", authController.registerUser);

router.get("/login", authController.showLogin);

router.post("/login", authController.loginUser);

router.post("/logout", authController.logoutUser);

module.exports = router;
