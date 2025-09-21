// const authors = require("../db");

// function getAuthorById(req, res) {
//   const id = parseInt(req.params.id);
//   const authorId = authors.find((a) => a.id === id);

//   if (!authorId)
//     return res.status(404).json({ message: "Author is not found!" });

//   res.status(200).json({ name: authorId.name });
// }

// module.exports = { getAuthorById };

const authors = require("../db");

// Controller function to get author by ID
function getAuthorById(req, res) {
  const id = parseInt(req.params.id); // get id from URL
  const author = authors.find((a) => a.id === id); // search in fake DB

  if (author) {
    res.json({ name: author.name });
  } else {
    res.status(404).json({ error: "Author not found" });
  }
}

module.exports = { getAuthorById };
