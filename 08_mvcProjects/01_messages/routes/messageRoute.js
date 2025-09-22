const express = require("express");
const messageController = require("../controllers/messageController");

const router = express.Router();

// router.get("/", getAllMessages);
router.get("/", messageController.getAllMessages);

// router.get("/:id", getMessageById);
router.get("/:id", messageController.getMessageById);

module.exports = router;
