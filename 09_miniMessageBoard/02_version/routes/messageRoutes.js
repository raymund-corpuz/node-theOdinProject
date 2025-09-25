const express = require("express");
const messageControllers = require("../controllers/messageControllers");

const router = express.Router();

// get all messages
router.get("/messages", messageControllers.getAllMessages);

// go to form
router.get("/new", messageControllers.goToForm);

// create new message
router.post("/new", messageControllers.createMessage);

// edit mode
router.get("/messages/:id", messageControllers.editMessageById);

// go for details
router.get("/details/:id", messageControllers.getMessageById);

// update a message
router.put("/messages/:id", messageControllers.updateMessageById);

// delete a message
router.delete("/messages/:id", messageControllers.deleteMessageById);

module.exports = router;
