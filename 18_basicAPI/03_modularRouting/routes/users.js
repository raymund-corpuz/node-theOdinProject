const express = require("express");
const router = express.Router();

//Fake in-memory user data
let users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

//get /users => return all users
router.get("/", (req, res) => {
  res.json(users);
});

//get /users/:id => returns a specific user
router.get("/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));

  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user);
});

//Post /users => create a new user
router.post("/", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email)
    return res.status(400).json({ message: "Name and email are required" });

  const newUser = { id: users.length + 1, name, email };

  users.push(newUser);
  res.status(201).json(newUser);
});

//Put /users/:id => updates a user
router.put("/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));

  if (!user) return res.status(404).json({ message: "User not found" });

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  res.json(user);
});

router.delete("/:id", (req, res) => {
  const index = users.findIndex((u) => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "User not found" });

  users.splice(index, 1);
  res.json({ message: "User deleted successfully" });
});

module.exports = router;
