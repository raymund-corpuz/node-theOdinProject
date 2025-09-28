/*//import bcrypt
const bcrypt = require("bcryptjs");
//import body , validationResult
const { body, validationResult } = require("express-validator");

//import UserStorage
const UserStorage = require("../models/UserStorage-v1");

//create registerValidation varible
const registerValidation = [
  //call username then validate
  body("username")
    .trim()
    .isAlpha()
    .withMessage("Username must only contain letters")
    .isLength({ min: 3, max: 15 })
    .withMessage("Username must be 3 - 15 characters long"),
  //call email then validate

  body("email")
    .trim()
    .isEmail()
    .withMessage("Enter valid email")
    .normalizeEmail(),
  //call password then validate

  body("password").trim().notEmpty().withMessage("Password is required"),
];

//create loginValidation var
const loginValidation = [
  //call email then validate
  body("email")
    .trim()
    .isEmail()
    .withMessage("Enter valid email")
    .normalizeEmail(),
  //call password then validate
  body("password").trim().notEmpty().withMessage("Password is required"),
];

//showRegister (req, res)
function showRegister(req, res) {
  res.render("register", { title: "Register", errors: null, oldInput: {} });
}

//registerUser (req, res) async -await
async function registerUser(req, res) {
  // registerUser-  error handling
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("register", {
      title: "Register",
      errors: errors.array(),
      oldInput: req.body,
    });
  }

  //call username, email, password - req.body
  const { username, email, password } = req.body;

  //error handling
  if (UserStorage.findByEmail(email)) {
    return res.status(400).render("register", {
      title: "Register",
      errors: [{ msg: "Email is already exist" }],
      oldInput: req.body,
    });
  }

  // registerUser-create var passwordhash

  const passwordHash = await bcrypt.hash(password, 10);

  //registerUser-create var user call UserStorage- addUser
  const user = UserStorage.addUser({ username, email, password });

  // registerUser-store user ID in session to keep logged in
  req.session.user = {
    id: user.id,
    username: user.username,
    email: user.email,
  };

  res.redirect("/");
}

//showLogin(req, res)
function showLogin(req, res) {
  res.render("login", { title: "Login", errors: null, oldInput: {} });
}
//showloginUser (req, res)

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

  req.session.user = {
    id: user.id,
    username: user.username,
    email: user.email,
  };

  res.redirect("/");
}

//logout (req, res)

function logout(req, res) {
  req.session.destroy(() => {
    res.redirect("/");
  });
}

//exports

module.exports = {
  showRegister,
  registerUser,
  showLogin,
  loginUser,
  logout,
  registerValidation,
  loginValidation,
};
*/
/*
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

const UserStorage = require("../models/UserStorage");

// registerValidation,
const registerValdation = [
  body("username")
    .trim()
    .isAlpha()
    .withMessage("Username must contain only letters")
    .isLength({ min: 3, max: 15 })
    .withMessage("Username must be 3-15 letters long"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Enter valid email")
    .normalizeEmail(),
  body("password").trim().notEmpty().withMessage("Password is required"),
];
// loginValidation,

const loginValidation = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Enter valid email")
    .normalizeEmail(),
  body("password").trim().notEmpty().withMessage("Password is required"),
];

//showRegister,
function showRegister(req, res) {
  res.render("register", {
    title: "Register",
    errors: null,
    oldInput: {},
  });
}

// registerUser,
async function registerUser(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render({
      title: "Register",
      errors: errors.array(),
      oldInput: req.body,
    });
  }

  const { username, email, password } = req.body;

  if (UserStorage.findByEmail(email)) {
    return res.status(400).render({
      title: "Register",
      errors: [{ msg: "Email already exist" }],
      oldInput: req.body,
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = UserStorage.addUser({ username, email, password });

  req.session.user = {
    id: user.id,
    username: user.username,
    email: user.email,
  };

  res.redirect("/");
}

// showLogin,
function showLogin(req, res) {
  res.render("login", { title: "Login", errors: null, oldInput: {} });
}

//loginUser,
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
      errors: [{ msg: "Enter valid email and password" }],
      oldInput: req.body,
    });
  }

  req.session.user = {
    id: user.id,
    username: user.username,
    email: user.email,
  };

  res.redirect("/");
}
// logout,

function logout(req, res) {
  req.session.destroy(() => {
    res.redirect("/");
  });
}

module.exports = {
  registerValdation,
  loginValidation,
  showRegister,
  registerUser,
  showLogin,
  loginUser,
  logout,
};
*/

const bcrypt = require("bcryptjs");
const { body, validationResults } = require("express-validator");
const UserStorage = require("../models/UserStorage");

//registerValdation,
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
    .withMessage("Enter valid email")
    .normalizeEmail(),
  body("password").trim().notEmpty().withMessage("Password is required"),
];

// loginValidation,
const loginValidation = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Enter valid email")
    .normalizeEmail(),
  body("password").trim().notEmpty().withMessage("Password is required"),
];

//showRegister,
function showRegister(req, res) {
  res.render("register", { title: "Register", errors: null, oldInput: {} });
}

// registerUser,
async function registerUser(req, res) {
  const errors = validationResults(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("register", {
      title: "Register",
      errors: errors.array(),
      oldInput: req.body,
    });
  }

  const { username, email, password } = req.body;

  if (UserStorage.findByEmail(email)) {
    return res.status(400).render("register", {
      title: "Register",
      errors: [{ msg: "Email already exist" }],
      oldInput: req.body,
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = UserStorage.addUser({ username, email, passwordHash });

  req.session.user = {
    id: user.id,
    username: user.username,
    email: user.email,
  };
  res.redirect("/");
}

//showLogin,
function showLogin(req, res) {
  res.render("login", { title: "Login", errors: null, oldInput: {} });
}

//loginUser,
async function loginUser(req, res) {
  const errors = validationResults(req);

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
      errors: [{ msg: "Incorrect email or password" }],
      oldInput: req.body,
    });
  }

  //missing =============================
  const match = await bcrypt.compare(password, user.passwordHash);

  if (!match) {
    return res.status(400).render("login", {
      title: "Login",
      errors: [{ msg: "Invalid email or Password" }],
      oldInput: req.body, //missing =========================
    });
  }

  req.session.user = {
    id: user.id,
    username: user.username,
    email: user.email,
  };

  res.redirect("/");
}

//logout,
function logout(req, res) {
  req.session.destroy(() => {
    res.redirect("/");
  });
}

module.exports = {
  registerValidation,
  loginValidation,
  showRegister,
  registerUser,
  loginUser,
  showLogin,
  logout,
};
