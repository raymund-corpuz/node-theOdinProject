const express = require("express");
const bookControllers = require("../controllers/bookControllers");
const router = express.Router();

router.get("/books", bookControllers.showAllBooks);

router.get("/books/new", bookControllers.showForm);

router.post("/books/new", bookControllers.createNewBook);

router.get("/books/edit/:id", bookControllers.editBook);

router.put("/books/update/:id", bookControllers.updateBookId);

router.delete("/books/delete/:id", bookControllers.bookDelete);

module.exports = router;
