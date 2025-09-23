const express = require("express"); // ==== correct
const messageController = require("../controllers/messageControllers"); // ==== correct

const router = express.Router(); // ==== correct

router.get("/", messageController.getAllMessages); // ==== correct
router.get("/:id", messageController.getMessageById); // ==== correct

module.exports = router; // ==== correct
