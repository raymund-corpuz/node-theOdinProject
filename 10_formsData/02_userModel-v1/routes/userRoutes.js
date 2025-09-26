const express = require("express");
const userControllers = require("../controllers/userControllers");

const router = express.Router();

router.get("/", userControllers.listUsers);
router.get("/create", userControllers.showCreateForm);
router.post(
  "/create",
  userControllers.userValidationRules,
  userControllers.createUser
);

module.exports = router;
