const bcrypt = require("bcryptjs"); //correct
const userModel = require("../models/userModel"); //correct
const passport = require("passport"); //missing
// show signup form (render ejs)
function showSignUpForm(req, res) {
  res.render("sign-up-form", { title: "Sign up" }); // correct
}
//handle signup form POST:
async function handleSignUp(req, res) {
  try {
    const { username, password } = req.body;
    // -> hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // -> save user to DB
    await userModel.createUser(username, hashedPassword);
    // -> redirect to login
    return res.redirect("/login"); // missing return
  } catch (error) {
    console.log("❌ Error occured :", error.message);
    //missing
    next(error);
  }
}

//WRONG ================== //
// async function showLogin(req, res) {
//   try {
//     const { username, password } = req.body;
//     const user = await userModel.findUserByUsername(username);
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).send("Incorrect Password");
//     }

//     res.render("index");
//   } catch (error) {
//     console.log("❌ Error occured :", error.message);
//   }
// }

// ============   Correct =================== //
function showLogin(req, res) {
  res.render("login-form", { title: "Login" });
}

// ============  Missing =================== //
const handleLogin = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
});

function logout(req, res) {
  req.logout();
  res.redirect("/login"); //correct
}

module.exports = {
  showLogin,
  showSignUpForm,
  handleSignUp,
  handleLogin, // missing
  logout,
};
