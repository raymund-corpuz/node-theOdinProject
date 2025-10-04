const express = require("express");
const bookControllers = require("../controllers/bookControllers");
const router = express.Router();

router.get("/books", bookControllers.showAllBooks);

router.get("/form", bookControllers.showForm);

router.post("/form", bookControllers.createNewBook);

module.exports = router;
