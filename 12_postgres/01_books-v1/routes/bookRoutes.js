const bookControllers = require("../controllers/bookControllers");
const express = require("express");
const router = express.Router();

router.get("/", bookControllers.listBooks);

router.get("/new", bookControllers.newBookForm);

router.post("/new", bookControllers.createBook);

router.delete("/delete", bookControllers.deleteBooks);

module.exports = router;
