const users = require("../models/Users");

function registerUser(req, res) {
  try {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username);

    if (user) return res.status(404).json({ message: "User already exists." });

    const newUser = {
      id: users.length ? users[users.length - 1].id + 1 : 1,
      username,
      password,
    };

    users.push(newUser);
    res.render("/login", { users });
  } catch (error) {
    res.status(500).json({ message: "Can't connect to Network" });
  }
}

function loginUser(req, res) {
  try {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username);

    if (!user) return res.status(404).json({ message: "User is Not Found" });

    res.redirect("/dashboard");
  } catch (error) {}
  res.status(500).json({ message: "Can't connect to Network" });
}

function logoutUser(req, res) {
  res.redirect("/login");
}

module.exports = { registerUser, loginUser, logoutUser };
