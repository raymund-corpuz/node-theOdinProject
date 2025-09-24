const messages = require("../models/Message");

async function getAllMessages(req, res) {
  try {
    res.render("index", { title: "Mini Messageboard", messages: messages });
  } catch (error) {
    res.status(500).json({ message: `Can't connect to network` });
  }
}

async function getNew(req, res) {
  res.render("form", { title: "New Form" });
}

async function createMessage(req, res) {
  try {
    const { text, user } = req.body;

    if (!text || !user)
      return res.status(400).json({ message: "All fields are required" });

    const newMessage = {
      id: messages.length ? messages[messages.length - 1].id + 1 : 1,
      text,
      user,
      added: new Date(),
    };

    messages.push(newMessage);

    res.redirect("/messages");
  } catch (error) {
    res.status(500).json({ message: `Can't connect to network` });
  }
}

async function showDetails(req, res) {
  try {
    const id = parseInt(req.params.id);
    const message = messages.find((m) => m.id === id);

    if (!message) return res.status(404).json({ message: "Message Not Found" });

    res.render("details", { title: "Message Details", message: message });
  } catch (error) {
    res.status(500).json({ message: `Can't connect to network` });
  }
}

module.exports = { getAllMessages, createMessage, getNew, showDetails };
