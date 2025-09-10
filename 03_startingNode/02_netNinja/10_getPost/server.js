const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let items = [
  { id: 1, name: "Apple" },
  { id: 2, name: "Banana" },
];

app.get("/", (req, res) => {
  res.send("Welcome to Home Page");
});

app.get("/items", (req, res) => {
  res.json(items);
});

app.post("/items", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });

  const newItem = {
    id: items.length ? items[items.length - 1].id + 1 : 1,
    name,
  };

  items.push(newItem);

  res.status(201).json(newItem);
});

app.delete("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Item not found" });
  }

  const deleteItem = items.splice(index, 1);
  res.json({ message: "Item deleted", item: deleteItem[0] });
});

app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});

// const express = require("express");
// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware: parse JSON request bodies
// app.use(express.json());

// // In-memory "database"
// let items = [
//   { id: 1, name: "Apple" },
//   { id: 2, name: "Banana" },
// ];

// app.get("/", (req, res) => {
//   res.send("Welcome Try/items to see the list");
// });

// // ✅ GET all items
// app.get("/items", (req, res) => {
//   res.json(items);
// });

// // ✅ POST new item
// app.post("/items", (req, res) => {
//   const { name } = req.body;
//   if (!name) return res.status(400).json({ error: "Name is required" });

//   const newItem = {
//     id: items.length ? items[items.length - 1].id + 1 : 1, // auto-increment
//     name,
//   };
//   items.push(newItem);

//   res.status(201).json(newItem); // 201 Created
// });

// // Start server
// app.listen(PORT, () =>
//   console.log(`✅ Server running at http://localhost:${PORT}`)
// );
