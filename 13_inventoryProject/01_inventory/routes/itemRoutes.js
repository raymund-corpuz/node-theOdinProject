const express = require("express");
const itemControllers = require("../controllers/itemControllers");
const router = express.Router();

router.get("/list", itemControllers.showAllItems);
router.get("/new", itemControllers.showItemForm);

module.exports = router;
