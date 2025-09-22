const express = require("express");
const { messages } = require("../models/messageModel");

function getAllMessages(req, res) {
  // res.render({ messages: messages }); // wrong
  res.render("index", { messages });
}

function getMessageById(req, res) {
  const id = parseInt(req.params.id);
  const messageId = messages.find((m) => m.id === id);

  if (!messageId) res.status(404).json({ message: "Message Not Found" });

  // res.status(200).json({ messageId });  - wrong
  res.render("show", { messageId });
}

module.exports = { getAllMessages, getMessageById }; // - wrong
