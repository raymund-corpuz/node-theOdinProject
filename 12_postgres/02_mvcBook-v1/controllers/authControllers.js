const user_db = require("../models/userModel");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

//registerValidation
const registerValidation = [
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("password")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters long"),
];

//loginValidation
const loginValidation = [
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("password")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters long"),
];

//registerGet
function registerGet(req, res) {
  res.render("register", { title: "Register", errors: null, oldInput: {} });
}

//registerPost
async function registerPost(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("register", {
      title: "Register",
      errors: errors.array(),
      oldInput: req.body,
    });
  }

  const { username, password } = req.body;

  const isExisting = await user_db.findUserByUsername(username);

  if (isExisting) {
    return res.status(400).render("register", {
      title: "Register",
      errors: [{ msg: "Username already exist" }],
      oldInput: req.body,
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await user_db.createUser(username, passwordHash);

  req.session.user = {
    id: user.id,
    username: user.username,
  };

  res.render("login");
}

//loginGet
function loginGet(req, res) {
  res.render("login", { title: "Login", errors: null, oldInput: {} });
}

// //loginPost
// async function loginPost(req, res) {
//   res.render("register", { title: "Register", errors: null, oldInput: {} });
// }

//loginPost
async function loginPost(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("login", {
      title: "Login",
      errors: errors.array(),
      oldInput: req.body,
    });
  }

  const { username, password } = req.body;

  const user = await user_db.findUserByUsername(username);

  if (!user) {
    return res.status(400).render("login", {
      title: "Login",
      errors: [{ msg: "Incorrect username or password" }],
      oldInput: req.body,
    });
  }

  const match = await bcrypt.compare(password, user.password_hash);

  if (!match) {
    return res.status(400).render("login", {
      title: "Login",
      errors: [{ msg: "Incorrect Password" }],
      oldInput: req.body,
    });
  }

  req.session.user = {
    id: user.id,
    username: user.username,
  };

  res.redirect("/books");
}

//logout
function logout(req, res) {
  req.session.destroy(() => {
    res.redirect("/auth/login");
  });
}

module.exports = {
  registerValidation,
  loginValidation,
  registerGet,
  registerPost,
  loginPost,
  loginGet,
  logout,
};
