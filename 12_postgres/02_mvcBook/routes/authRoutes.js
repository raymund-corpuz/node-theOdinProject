const express = require("express");
const authControllers = require("../controllers/authControllers");
const router = express.Router();

router.get("/register", authControllers.registerGet);

router.post("/register", authControllers.registerPost);

router.get("/login", authControllers.loginGet);

router.post("/login", authControllers.loginPost);

router.get("/logout", authControllers.logout);

module.exports = router;
