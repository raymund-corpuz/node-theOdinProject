const express = require("express");
const itemControllers = require("../controllers/itemControllers");
const router = express.Router();

router.get("/list", itemControllers.showAllItems);
router.get("/new", itemControllers.showItemForm);
router.post("/new", itemControllers.createItem);
router.get("/edit/:id", itemControllers.editItemForm);
router.post("/update/:id", itemControllers.itemUpdate);

module.exports = router;
