const express = require("express");
const bookControllers = require("../controllers/bookControllers");
const router = express.Router();

router.get("/books", bookControllers.showAllBooks);

router.get("/form", bookControllers.showForm);

module.exports = router;
