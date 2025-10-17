const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

// ======= Routes ================= //
app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  res.json(user);
});

//POst /users => creates a user
app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

//PUT /users/:id => updates a user
app.put("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    res.status(404).json({ message: "User not found" });
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email | user.email;

  res.json({ message: " User updated successfully", user });
});

//Delete /users/:id => deletes a user
app.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  users = users.filter((u) => u.id !== userId);

  res.json({ message: `User ${userId} deleted successfully` });
});

// ============ START SERVER ============  //
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
