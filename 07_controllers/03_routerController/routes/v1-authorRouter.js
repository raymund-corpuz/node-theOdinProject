const express = require("express");
const { getAuthorId } = require("../controllers/v1-authorController");

const router = express.Router();

router.get("/:id", getAuthorId);

module.exports = router;
