const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

//FUNCTION showSignUpForm(req, res)
function showSignUpForm(req, res) {
  res.render("signup");
}

//FUNCTION handleSignUp
async function handleSignUp(req, res) {
  try {
    const { username, password } = req.body;
    const user = await userModel.finduserByUsername(username);
    const hashedPassword = await bcrypt.hash(password, 10);
    if (user) return res.status(404).send("Username already taken");
    await userModel.createUser(username, hashedPassword);
    res.redirect("/login");
  } catch (error) {
    console.error("❌ Error during sign-up:", error.message);
  }
}

//FUNCTION showLogin
function showLogin(req, res) {
  res.render("login");
  //   res.send("Login Form Page");
}

//FUNCTION logout(req, res)
function logout(req, res) {
  req.logout((err) => {
    if (err) {
      console.log("Logout error :", err);
      return next(err);
    }
    res.redirect("/login");
  });
}

function showDashboard(req, res) {
  res.render("dashboard");
}

module.exports = {
  showSignUpForm,
  handleSignUp,
  showLogin,
  logout,
  showDashboard,
};
