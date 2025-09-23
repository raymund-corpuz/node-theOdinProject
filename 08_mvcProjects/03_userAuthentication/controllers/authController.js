const users = require("../models/Users");

//missing
let currentUser = null; // simulate login state (in-memory)

function showRegister(req, res) {
  res.render("register");
}

function registerUser(req, res) {
  try {
    const { username, password } = req.body; // correct
    const user = users.find((u) => u.username === username); // correct

    if (user) return res.status(404).json({ message: "User already exists." }); // correct

    //correct
    const newUser = {
      id: users.length ? users[users.length - 1].id + 1 : 1,
      username,
      password,
    };

    users.push(newUser); // correct
    res.render("login", { users });
  } catch (error) {
    res.status(500).json({ message: "Can't connect to Network" });
  }
}

function showLogin(req, res) {
  res.render("login");
}

function loginUser(req, res) {
  try {
    const { username, password } = req.body; //correct
    //const user = users.find((u) => u.username === username); wrong

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) return res.status(404).json({ message: "User is Not Found" });

    currentUser = user;

    res.send(`Welcome, ${user.username}! You are logged in`);
    // res.redirect("/dashboard");
  } catch (error) {}
  res.status(500).json({ message: "Can't connect to Network" });
}

function logoutUser(req, res) {
  currentUser = null;

  // res.redirect("/login");
  res.send("You have been logged out");
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  showLogin, // missing
  showRegister, // missing
};
