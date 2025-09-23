const express = require("express"); // correct
const authControllers = require("../controllers/authController"); // correct

const router = express.Router(); //correct

router.get("/register", authControllers.showRegister);
router.post("/register", authControllers.registerUser);
router.get("/login", authControllers.showLogin);
router.post("/login", authControllers.loginUser);
router.post("/logout", authControllers.logoutUser);

module.exports = router;
