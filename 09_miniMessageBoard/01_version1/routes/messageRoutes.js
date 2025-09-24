const messageControllers = require("../controllers/messageControllers");

const express = require("express");
const router = express.Router();

router.get("/messages", messageControllers.getAllMessages);

router.get("/form", messageControllers.getNew);

router.post("/new", messageControllers.createMessage);

module.exports = router;
