const express = require("express");
const router = express.Router();
const controllers = require("../controllers/bookController");

router.get("/", controllers.listBooks);
router.get("/new", controllers.newBookForm);
router.post("/new", controllers.createBook);
router.get("/delete", controllers.deleteBooks);

module.exports = router;
