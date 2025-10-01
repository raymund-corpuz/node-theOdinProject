const express = require("express");
const bookControllers = require("../controllers/bookControllers");
const router = express.Router();

router.get("/books", bookControllers.listBooks);

router.get("/books/new", bookControllers.newBookForm);

router.post("/books", bookControllers.createBook);

router.delete("/books", bookControllers.deleteBooks);

module.exports = router;
