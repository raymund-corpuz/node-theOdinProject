const express = require("express"); // correct
const productController = require("../controllers/productControllers"); //correct

const router = express.Router(); //correct

router.get("/products", productController.getAllProducts);
router.get("/products/:id", productController.getProduct);
router.post("/products", productController.createProduct);
router.put("/products/:id", productController.updateProduct);
router.delete("/products/:id", productController.deleteProduct);

module.exports = router;
