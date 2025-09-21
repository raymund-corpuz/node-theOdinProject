const express = require("express");
const { getAuthorById } = require("../controllers/authorController");

const router = express.Router();

router.get("/:id", getAuthorById);

module.exports = router;

// const express = require("express");
// const { getAuthorById } = require("../controllers/authorController");

// const router = express.Router();

// // Define GET /authors/:id
// router.get("/:id", getAuthorById);

// module.exports = router;
