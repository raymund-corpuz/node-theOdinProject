const { createUser, findUserByEmail } = require("../models/userModels");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

//usernameValidator
const registerValidator = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long"),
  body("email").trim().isEmail().withMessage("Must be valid email"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters long"),
];

//loginValidator
const loginValidator = [
  body("email").trim().isEmail().withMessage("Must be valid email"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters long"),
];

//registerGet
function registerGet(req, res) {
  try {
    res.render("register", { title: "Register", errors: null, oldInput: {} });
  } catch (error) {
    console.error("Error occured: ", error.message);
  }
}

//registerPost
async function registerPost(req, res) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("register", {
        title: "Register",
        errors: errors.array(),
        oldInput: req.body,
      });
    }

    const { username, email, password } = req.body;
    const emailIsExist = await findUserByEmail(email);

    // check if email already exist
    if (emailIsExist) {
      return res.status(400).render("register", {
        title: "Register",
        errors: [{ msg: "Email already exist" }],
        oldInput: req.body,
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await createUser(username, email, passwordHash);

    req.session.user = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    res.render("login");
  } catch (error) {
    console.error("Error occured: ", error.message);
  }
}

//loginGet
function loginGet(req, res) {
  res.render("login", { title: "Login", errors: null, oldInput: {} });
}

//loginPost
async function loginPost(req, res) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("login", {
        title: "Login",
        errors: errors.array(),
        oldInput: req.body,
      });
    }

    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    //check if email is found
    if (!user) {
      return res.status(400).render("login", {
        title: "Login",
        errors: [{ msg: "Email is not found" }],
        oldInput: req.body,
      });
    }

    const match = await bcrypt.compare(password, user.password);
    //if password is not match
    if (!match) {
      return res.status(400).render("login", {
        title: "Login",
        errors: [{ msg: "Incorrect password" }],
        oldInput: req.body,
      });
    }

    req.session.user = {
      id: user.id,
      email: user.email,
    };

    res.redirect("/books");
  } catch (error) {
    console.error("Error occured: ", error.message);
  }
}

//logout
function logout(req, res) {
  try {
    req.session.destroy(() => {
      res.redirect("/auth/login");
    });
  } catch (error) {
    console.error("Error occured: ", error.message);
  }
}

module.exports = {
  registerValidator,
  registerGet,
  registerPost,
  loginGet,
  loginPost,
  logout,
};
