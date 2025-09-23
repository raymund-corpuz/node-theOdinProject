const messages = require("../models/Messages"); // ==== correct

function getAllMessages(req, res) {
  try {
    res.render("index", { messages }); // ==== correct
  } catch (error) {
    res.status(500).json({ message: "Can't connect to the Network" });
  }

  // res.render("index", { messages });
}

function getMessageById(req, res) {
  try {
    const id = parseInt(req.params.id);

    const message = messages.find((m) => m.id === id);

    if (!message)
      return res.status(404).json({ message: "Message Not Found!" });
    res.render("show", { message });
  } catch (error) {
    res.status(500).json({ message: "Can't connect to the Network" });
  }
}

module.exports = { getAllMessages, getMessageById };
