const messages = require("../models/Message");

async function getAllMessages(req, res) {
  try {
    res.render("index", { title: "Mini Messageboard", messages: messages });
  } catch (error) {
    res.status(500).json({ message: `Can't connect to network` });
  }
}

async function getNew(req, res) {
  res.render("form", { title: "New Form", messages: messages });
}

async function createMessage(req, res) {
  try {
    const { text, user } = req.body;

    if (!text || !user)
      return res.status(404).json({ message: "All fields are required" });

    const newMessage = {
      text,
      user,
      added: new Date(),
    };

    messages.push(newMessage);

    res.render("index", { title: "New Message", messages: messages });
  } catch (error) {
    res.status(500).json({ message: `Can't connect to network` });
  }
}

module.exports = { getAllMessages, createMessage, getNew };
