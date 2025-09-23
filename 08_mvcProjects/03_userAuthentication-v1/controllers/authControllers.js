let users = require("../models/Users"); //correct

let currentUser = null; //correct

function showUsers(req, res) {
  res.render("register"); //correct
}

function registerUser(req, res) {
  const { username, password } = req.body;
  const userExist = users.find((u) => u.username === username);

  if (userExist)
    return res.status(404).json({ message: "Username already exists." }); //correct

  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    username,
    password,
  };

  users.push(newUser);

  res.redirect("login"); //correct
}

function showLogin(req, res) {
  res.render("login"); // correct
}

function loginUser(req, res) {
  const { username, password } = req.body; // correct
  const user = users.find(
    //correct
    (u) => u.username === username && u.password === password
  );

  if (!user) return res.status(404).json({ message: "Incorrect Credential" });

  currentUser = user;
  res.send(`Welcome ${user.username}. To the dashboard`); //correct
}

function logoutUser(req, res) {
  currentUser = null;
  res.redirect("register");
}

module.exports = { showLogin, showUsers, registerUser, loginUser, logoutUser };
