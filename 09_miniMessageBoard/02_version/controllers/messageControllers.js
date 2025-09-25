const messages = require("../models/Message");

function getAllMessages(req, res) {
  try {
    res.render("index", { title: "Mini Messageboard", messages });
  } catch (error) {
    res.status(500).json({ message: "Server side error ❌" });
  }
}

function goToForm(req, res) {
  try {
    res.render("form", { title: "Create new message" });
  } catch (error) {
    res.status(500).json({ message: "Server side error ❌" });
  }
}

function createMessage(req, res) {
  try {
    const { name, text } = req.body;

    if (!name || !text)
      return res.status(400).json({ message: "All fields are required!" });

    const newMessage = {
      id: messages.length ? messages[messages.length - 1].id + 1 : 1,
      name,
      text,
      added: Date.now(),
    };

    messages.push(newMessage);

    res.redirect("/messages");
  } catch (error) {
    res.status(500).json({ message: "Server side error ❌" });
  }
}

function getMessageById(req, res) {
  try {
    const id = parseInt(req.params.id);

    const message = messages.find((m) => m.id === id);

    if (!message)
      return res.status(404).json({ message: "Message not found!" });

    res.render("details", { title: "Message Details", message: message });
  } catch (error) {
    res.status(500).json({ message: "Server side error ❌" });
  }
}

function editMessageById(req, res) {
  try {
    const id = parseInt(req.params.id);

    const message = messages.find((m) => m.id === id);

    if (!message)
      return res.status(404).json({ message: "Message not found!" });
    res.render("edit", { title: "Edit message", message: message });
  } catch (error) {
    res.status(500).json({ message: "Server side error ❌" });
  }
}

function updateMessageById(req, res) {
  try {
    const id = parseInt(req.params.id);

    const message = messages.find((m) => m.id === id);

    if (!message)
      return res.status(404).json({ message: "Message not found!" });

    const { name, text } = req.body;

    if (name) message.name = name;
    if (text) message.text = text;

    res.redirect(`/messages`);
  } catch (error) {
    res.status(500).json({ message: "Server side error ❌" });
  }
}

function deleteMessageById(req, res) {
  try {
    const id = parseInt(req.params.id);

    if (!id) return res.status(404).json({ messages: "Message not found!" });

    messages = messages.filter((m) => m.id !== id);

    res.redirect("/messages");
  } catch (error) {
    res.status(500).json({ message: "Server side error ❌" });
  }
}

module.exports = {
  getAllMessages,
  createMessage,
  updateMessageById,
  deleteMessageById,
  getMessageById,
  goToForm,
  editMessageById,
};
