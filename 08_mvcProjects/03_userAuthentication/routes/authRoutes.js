const express = require("express");
const authControllers = require("../controllers/authController");

const router = express.Router();

router.get("/", authControllers.registerUser);
router.post("/", authControllers.registerUser);
router.get("/", authControllers.loginUser);
router.post("/", authControllers.loginUser);
router.post("/", authControllers.logoutUser);

module.exports = router;
