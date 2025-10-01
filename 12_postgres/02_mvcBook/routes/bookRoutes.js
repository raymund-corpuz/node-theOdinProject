const express = require("express");
const bookControllers = require("../controllers/bookControllers");
const router = express.Router();

router.get("/books", bookControllers.listBooks);

router.get("/new", bookControllers.newBookForm);

router.post("/new", bookControllers.createBook);

router.post("/delete", bookControllers.deleteBooks);

module.exports = router;
