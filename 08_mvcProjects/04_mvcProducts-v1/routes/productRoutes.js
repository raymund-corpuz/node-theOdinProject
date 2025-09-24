const productControllers = require("../controllers/productControllers");
const express = require("express");

const router = express.Router();

//show all Products
router.get("/products", productControllers.getAllProducts);

// get single Product
router.get("/products/:id", productControllers.getProduct);

//create Product
router.post("/products", productControllers.createProduct);

//update Product
router.put("/products/:id", productControllers.updateProduct);

//delete Product
router.delete("/products/:id", productControllers.deleteProduct);

module.exports = router;
