const messageControllers = require("../controllers/messageControllers");

const express = require("express");
const router = express.Router();

router.get("/messages", messageControllers.getAllMessages);

router.get("/new", messageControllers.getNew);

router.post("/new", messageControllers.createMessage);

router.get("/details/:id", messageControllers.showDetails);

module.exports = router;
