// const express = require("express");
// const app = express();
// const port = 3000;

// let products = [
//   { id: 1, name: "Laptop", price: 1200 },
//   { id: 2, name: "Mouse", price: 25 },
//   { id: 3, name: "Keyboard", price: 75 },
// ];

// //Get All Products
// app.get("/products", (req, res) => {
//   res.json(products);
// });

// //Add new Product
// app.post("/add-hardcoded-product", (req, res) => {
//   const { name, price } = req.body;

//   if (!name || !price) {
//     return res.status(404).send("No Product and Price is define");
//   }
//   const newProduct = {
//     id: products.length + 1, // Simple ID generation
//     name,
//     price,
//   };

//   products.push(newProduct);
//   res.status(201).json({ message: "Product added successfully", products });
// });

// // Get Single Product
// app.get("/products/:id", (req, res) => {
//   const itemId = products.find((i) => i.id === parseInt(req.params.id));

//   if (!itemId) return res.status(404).json({ message: "Item not Found" });

//   res.json(itemId);
// });

// //Update item by id
// app.put("/update-products/:id", (req, res) => {
//   const itemId = products.find((i) => i.id === parseInt(req.params.id));

//   if (!itemId) return res.status(400).json({ message: "Product Not Found" });

//   const { name, price } = req.body;
//   if (name) itemId.name = name;

//   if (price != null) itemId.price = price;

//   res.json(itemId);
// });

// app.delete("/delete-products/:id", (req, res) => {
//   const itemIndex = products.findIndex((i) => i.id === parseInt(req.params.id));

//   if (itemIndex === -1)
//     return res.status(404).json({ message: "Product not found." });

//   const deleteItem = products.splice(itemIndex, 1);
//   res.json(deleteItem[0]);
// });

// app.listen(port, () => {
//   console.log(`🚀Server listening at http://localhost:${port}`);
// });

// ========================================================== //
//                          RE_CREATE
// ========================================================== //

const express = require("express");
const app = express();

//missing =====================
//app.use(express.json());
//missing =====================

const PORT = 8080;

//create inventory

let inventory = [
  { id: 1, name: "Laptop", quantity: 10 },
  { id: 2, name: "Phone", quantity: 24 },
  { id: 3, name: "Smart TV", quantity: 12 },
];

// Get all Items from Invetory
app.get("/items", (req, res) => {
  try {
    res.status(200).json(inventory);
  } catch (err) {
    console.log(err);
  }
});

// Add new Item into the Inventory
app.post("/add-item", (req, res) => {
  try {
    const { name, quantity } = req.body;

    if (!name || !quantity)
      return res.status(400).json({ message: "Name and Quantity is Required" });

    const newItem = {
      id: inventory.length + 1,
      name,
      quantity,
    };

    inventory.push(newItem);
    res.status(201).json(newItem);
  } catch (err) {
    console.log(err);
  }
});

// Update an item using the id
app.put("/update-item", (req, res) => {
  try {
    const itemId = inventory.find((i) => i.id === parseInt(req.params.id));

    //missing ============================//
    //if (!itemId) return res.status(404).json({ message: "Item not found" });

    //missing ============================//

    const { name, quantity } = req.body;

    if (name) itemId.name = name;

    if (quantity != null) itemId.quantity = quantity;
    res.status(200).json(itemId);
  } catch (err) {
    console.log(err);
  }
});

// Delete an Item using the id
app.delete("/delete-item", (req, res) => {
  try {
    const itemId = inventory.findIndex((i) => i.id === parseInt(req.params.id));

    //missing ==================================//
    // if (index === -1) return res.status(404).json({ message: "Item not found" });
    //missing ==================================//

    // WRONG =========================================//
    if (!itemId) return res.status(404).json({ message: "No item Found" });
    // WRONG =========================================//

    const deleteItem = inventory.splice(itemId, 1);
    res.json(deleteItem[0]);
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log(`🚀Server is running http://localhost:${PORT}`);
});

//=============   CORRECT WAY    ========================//

/*
const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.json()); // Middleware for parsing JSON

let inventory = [
  { id: 1, name: "Laptop", quantity: 10 },
  { id: 2, name: "Phone", quantity: 24 },
  { id: 3, name: "Smart TV", quantity: 12 },
];

// Get all items
app.get("/items", (req, res) => {
  res.status(200).json(inventory);
});

// Add new item
app.post("/items", (req, res) => {
  const { name, quantity } = req.body;

  if (!name || quantity == null)
    return res.status(400).json({ message: "Name and Quantity are required" });

  const newItem = { id: inventory.length + 1, name, quantity };
  inventory.push(newItem);

  res.status(201).json(newItem);
});

// Update item
app.put("/items/:id", (req, res) => {
  const item = inventory.find((i) => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ message: "Item not found" });

  const { name, quantity } = req.body;
  if (name) item.name = name;
  if (quantity != null) item.quantity = quantity;

  res.status(200).json(item);
});

// Delete item
app.delete("/items/:id", (req, res) => {
  const index = inventory.findIndex((i) => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Item not found" });

  const deletedItem = inventory.splice(index, 1);
  res.json(deletedItem[0]);
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
