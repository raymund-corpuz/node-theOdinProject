const { body, validationResult } = require("express-validator");

const UsersStorage = require("../models/UserStorage");

const userValidationRules = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage("First name must contain only letters")
    .isLength({ min: 1, max: 10 })
    .withMessage("First name must be 1-10 characters long"),

  body("lastName")
    .trim()
    .isAlpha()
    .withMessage("Last name must contain only letters")
    .isLength({ min: 3, max: 10 })
    .withMessage("Last name must be 1-10 characters long"),
  body("age")
    .optional({ values: "falsy" })
    .isInt({ min: 18, max: 120 })
    .withMessage("Age must be an integere between 18 and 120")
    .toInt(),

  body("bio")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 200 })
    .withMessage("Bio must be at most 200 characters"),
];

//Controller methods
function listUsers(req, res) {
  const users = UsersStorage.getUsers();
  res.render("index", { title: "User List", users });
}

function showCreateForm(req, res) {
  res.render("createUser", {
    title: "Create User",
    errors: null,
    oldInput: {},
  });
}

function createUser(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("createUser", {
      title: "Create User",
      errors: errors.array(),
      oldInput: req.body,
    });
  }

  const { firstName, lastName, age, bio } = req.body;

  UsersStorage.addUser({ firstName, lastName, age, bio });

  res.redirect("/");
}

module.exports = { listUsers, showCreateForm, createUser, userValidationRules };
