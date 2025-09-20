const { Router } = require("express");
const authorRouter = Router();

// GET /authors/
authorRouter.get("/", (req, res) => {
  res.send("All Authors");
});

// GET /authors/:authorId
authorRouter.get("/:authorId", (req, res) => {
  const { authorId } = req.params;
  res.send(`Author Id: ${authorId}`);
});

module.exports = authorRouter;
