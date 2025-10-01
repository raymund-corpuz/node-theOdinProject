/*const user_db = require("../models/userModel");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const registerValidation = [
  body("username")
    .trim()
    .isAlpha()
    .withMessage("Username must only contain letters")
    .isLength({ min: 3, max: 15 })
    .withMessage("Username must be 3-15 characters long "),

  body("password").trim().notEmpty().withMessage("Password is required!"),
];

const loginValidation = [
  body("username")
    .trim()
    .isAlpha()
    .withMessage("Username must only contain letters")
    .isLength({ min: 3, max: 15 })
    .withMessage("Username must be 3-15 characters long "),

  body("password").trim().notEmpty().withMessage("Password is required!"),
];

//show register form
function registerGet(req, res) {
  res.render("register", {
    title: "Register Form",
    errors: null,
    oldInput: {},
  });
}
// register Post
async function registerPost(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("register", {
      title: "Register Form",
      errors: errors.array(),
      oldInput: req.body,
    });
  }
  //== wrong
  //const { username, password_hash } = req.body;
  const { username, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);

  //missing
  const existingUser = await user_db.findUserByUsername(username);
  if (existingUser) {
    return res.status(400).render("register", {
      title: "Register",
      errors: [{ msg: "Username already exist" }],
      oldInput: req.body,
    });
  }

  const user = await user_db.createUser(username, passwordHash);
  req.session.user = {
    id: user.id,
    username: user.username,
  };
  res.redirect("/");
}

//login Get
function loginGet(req, res) {
  res.render("login", { title: "Login", errors: null, oldInput: {} });
}

//login Post
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
      errors: [{ msg: "Invalid username or password" }],
      oldInput: req.body,
    });
  }

  // const match = await bcrypt.compare(password, user.passwordHash);
  const match = await bcrypt.compare(password, user.password_hash);

  if (!match) {
    return res.status(400).render("login", {
      title: "Login",
      errors: [{ msg: "Incorrect password" }],
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
  loginGet,
  loginPost,
  logout,
};
*/

const user_db = require("../models/userModel");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const registerValidation = [
  body("username")
    .trim()
    .isAlpha()
    .withMessage("Username must only contain letters")
    .isLength({ min: 3, max: 15 })
    .withMessage("Username must be 3-15 characters long"),

  body("password").trim().notEmpty().withMessage("Password is required!"),
];

const loginValidation = [
  body("username")
    .trim()
    .isAlpha()
    .withMessage("Username must only contain letters")
    .isLength({ min: 3, max: 15 })
    .withMessage("Username must be 3-15 characters long"),

  body("password").trim().notEmpty().withMessage("Password is required!"),
];

// Register Form
function registerGet(req, res) {
  res.render("register", {
    title: "Register Form",
    errors: null,
    oldInput: {},
  });
}

// Register Post
async function registerPost(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("register", {
      title: "Register Form",
      errors: errors.array(),
      oldInput: req.body,
    });
  }

  const { username, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);

  const existingUser = await user_db.findUserByUsername(username);
  if (existingUser) {
    return res.status(400).render("register", {
      title: "Register",
      errors: [{ msg: "Username already exists" }],
      oldInput: req.body,
    });
  }

  const user = await user_db.createUser(username, passwordHash);

  req.session.user = { id: user.id, username: user.username };
  res.redirect("/books");
}

// Login Form
function loginGet(req, res) {
  res.render("login", { title: "Login", errors: null, oldInput: {} });
}

// Login Post
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
      errors: [{ msg: "Invalid username or password" }],
      oldInput: req.body,
    });
  }

  const match = await bcrypt.compare(password, user.password_hash);

  if (!match) {
    return res.status(400).render("login", {
      title: "Login",
      errors: [{ msg: "Incorrect password" }],
      oldInput: req.body,
    });
  }

  req.session.user = { id: user.id, username: user.username };
  res.redirect("/books");
}

// Logout
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
  loginGet,
  loginPost,
  logout,
};
