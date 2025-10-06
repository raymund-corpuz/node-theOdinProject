const express = require("express");
const categoryControllers = require("../controllers/categoryModels");
const router = express.Router();

router.get("/", categoryControllers.showAll);

module.export = router;
