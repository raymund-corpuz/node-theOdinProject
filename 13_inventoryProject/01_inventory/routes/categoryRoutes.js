const express = require("express");
const categoryControllers = require("../controllers/categoryControllers");
const router = express.Router();

router.get("/", categoryControllers.showIndex);
router.get("/categories", categoryControllers.showAll);
router.get("/categories/form", categoryControllers.showForm);
router.post("/categories/new", categoryControllers.create);
router.get("/categories", categoryControllers.showAll);
router.get("/categories/:id", categoryControllers.categoryDetails);
router.get("/categories/edit/:id", categoryControllers.editForm);
router.post("/categories/update/:id", categoryControllers.categoryUpdate);

module.exports = router;
