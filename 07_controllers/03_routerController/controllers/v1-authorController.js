const authors = require("../db-v1");

function getAuthorId(req, res) {
  const id = parseInt(req.params.id);
  const authorId = authors.find((a) => a.id === id);

  if (!authorId) return res.status(404).json({ message: "Author not found" });

  res.status(200).json({ name: authorId.name });
}

module.exports = { getAuthorId };
