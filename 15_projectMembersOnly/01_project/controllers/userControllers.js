const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");

//show sign-up form
function showSignUpForm(req, res) {
  res.render("sign-up");
}

//handle sign-up
async function handleSignUp(req, res) {
  try {
    const {
      first_name,
      last_name,
      username,
      password,
      membership_status,
      is_admin,
    } = req.body;

    const user = await userModel.getUserByUsername(username);

    if (user) return res.status(401).send("Username is already taken");

    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.createUser(
      first_name,
      last_name,
      username,
      hashedPassword,
      membership_status,
      is_admin
    );

    res.redirect("/login");
  } catch (error) {
    console.log("❌ Fail to create user", error.message);
  }
}

//show login form
function showLoginForm(req, res) {
  res.render("login");
}

//show dashboard
function showDashboard(req, res) {
  res.render("dashboard");
}

function logout(req, res) {
  req.logout((err) => {
    if (err) {
      console.log("❌ Error occured :", err.message);
      return next(err);
    }
    res.redirect("/login");
  });
}

//export
module.exports = {
  showSignUpForm,
  handleSignUp,
  showLoginForm,
  showDashboard,
  logout,
};
