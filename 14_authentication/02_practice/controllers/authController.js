const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
// show signup form (render ejs)
function showSignUpForm(req, res) {
  res.render("sign-up-form", { title: "Sign up" });
}
// handle signup form POST:
async function handleSignUp(req, res) {
  try {
    const { username, password } = req.body;
    // -> hash password
    const hashedPassword = await bcrypt.hasg(password, 10);
    // -> save user to DB
    await userModel.createUser(username, hashedPassword);
    // -> redirect to login
    res.redirect("/login");
  } catch (error) {
    console.log("❌ Error occured :", error.message);
  }
}

async function showLogin(req, res) {
  try {
    const { username, password } = req.body;
    const user = await userModel.findUserByUsername(username);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Incorrect Password");
    }

    res.render("index");
  } catch (error) {
    console.log("❌ Error occured :", error.message);
  }
}

function logout(req, res) {
  req.logout();
  res.redirect("/login");
}

module.exports = {
  showLogin,
  showSignUpForm,
  handleSignUp,
  logout,
};
