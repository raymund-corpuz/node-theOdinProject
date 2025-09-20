const { Router } = require("express");
const bookRouter = Router();

//GET books
bookRouter.get("/", (req, res) => {
  res.send("All books");
});

//GET /books/:bookId
bookRouter.get("/:bookId", (req, res) => {
  const { bookId } = req.params;
  res.send(`Book Id: ${bookId}`);
});

module.exports = bookRouter;
