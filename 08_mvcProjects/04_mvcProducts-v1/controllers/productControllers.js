const Product = require("../models/Products");

async function getAllProducts(req, res) {
  try {
    const product = await Product.find();
    res.render("products/index", { product });
  } catch (error) {
    res.status(500).json({ message: "Failed to Connect ❌" });
  }
}

async function getProduct(req, res) {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (!product) return res.status(404).json({ message: "Product Not Found" });

    res.render("products/show", { product });
  } catch (error) {
    res.status(500).json({ message: "Failed to Connect ❌" });
  }
}

async function createProduct(req, res) {
  try {
    const { name, price, description } = req.body;

    if (!name || !price || !description)
      return res.status(404).json({ message: "All Fields are Required" });

    await Product.create({ name, price, description });

    res.redirect("/products");
  } catch (error) {
    res.status(500).json({ message: "Failed to Connect ❌" });
  }
}

async function updateProduct(req, res) {
  try {
    const id = req.params.id;
    const { name, price, description } = req.body;

    const product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        description,
      },
      { new: true, runValidators: true }
    );

    if (!product) return res.status(404).json({ message: "Product Not Found" });

    res.redirect("/products/${product._id}");
  } catch (error) {
    res.status(500).json({ message: "Failed to Connect ❌" });
  }
}

async function deleteProduct(req, res) {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);

    //missing
    if (!product) return res.status(404).json({ message: "Product Not Found" });

    res.redirect("/products");
  } catch (error) {
    res.status(500).json({ message: "Failed to Connect ❌" });
  }
}

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
