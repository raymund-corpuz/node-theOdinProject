const express = require("express");
const router = express.Router();

const {
  listUsers,
  showCreateForm,
  createUser,
  userValidationRules,
} = require("../controllers/userController");

router.get("/", listUsers);
router.get("/create", showCreateForm);
router.post("/create", userValidationRules, createUser);

module.exports = router;
