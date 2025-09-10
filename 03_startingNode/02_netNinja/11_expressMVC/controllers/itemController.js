const items = require("../models/itemModel");

exports.getItems = (req, res) => {
  res.json(items);
};

exports.createItem = (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });

  const newItem = {
    id: items.length ? items[items.length - 1].id + 1 : 1,
    name,
  };

  items.push(newItem);

  res.status(201).json(newItem);
};

exports.deleteItem = (req, res) => {
  const id = parseInt(req.params.id);
  const index = index.findIndex((item) => item.id === id);

  if (index === -1) return res.status(404).json({ error: "Item Not Found" });

  const deleted = items.splice(index, 1);
  res.json({ message: "Item is deleted", deleted });
};
