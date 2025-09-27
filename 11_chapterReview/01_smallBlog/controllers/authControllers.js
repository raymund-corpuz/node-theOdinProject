const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

const UserStorage = require("../models/UserStorage");

const registerValidation = [
  body("username")
    .trim()
    .isAlpha()
    .withMessage("Username must only contain letters")
    .isLength({ min: 3, max: 15 })
    .withMessage("Username must be 3-15 characters long"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Enter a valid email")
    .normalizeEmail(),

  body("password").notEmpty().withMessage("Password is required"),
];

//validation rules for login
const loginValidation = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Enter a valid email")
    .normalizeEmail(),

  body("password").trim().notEmpty().withMessage("Password is required"),
];

// Show register form
function showRegister(req, res) {
  res.render("register", { title: "Register", errors: null, oldInput: {} });
}

async function registerUser(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("register", {
      title: "Register",
      errors: errors.array(),
      oldInput: req.body,
    });
  }

  const { username, email, password } = req.body;

  // Prevent duplicate email
  if (UserStorage.findByEmail(email)) {
    return res.status(400).render({
      title: "Register",
      errors: [{ msg: "Email already registered" }],
      oldInput: req.body,
    });
  }

  //Hash password

  const passwordHash = await bcrypt.hash(password, 10);

  const user = UserStorage.addUser({ username, email, password });

  // store user ID in session to keep logged in
  req.session.user = {
    id: user.id,
    username: user.username,
    email: user.email,
  };

  res.redirect("/");
}

// Show login form
function showLogin(req, res) {
  res.render("login", { title: "Login", errors: null, oldInput: {} });
}

async function loginUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("login", {
      title: "Login",
      errors: errors.array(),
      oldInput: req.body,
    });
  }

  const { email, password } = req.body;

  const user = UserStorage.findByEmail(email);

  if (!user) {
    return res.status(400).render("login", {
      title: "Login",
      errors: [{ msg: "Invalid email or password" }],
    });
  }

  //Login successful
  req.session.user = {
    id: user.id,
    username: user.username,
    email: user.email,
  };

  res.redirect("/");
}

//Logout
function logout(req, res) {
  req.session.destroy(() => {
    res.redirect("/");
  });
}

module.exports = {
  showRegister, //correct
  showLogin, //correct
  loginUser, //correct
  registerUser, //correct
  registerValidation, //correct
  loginValidation, //correct
  logout, //correct
};
