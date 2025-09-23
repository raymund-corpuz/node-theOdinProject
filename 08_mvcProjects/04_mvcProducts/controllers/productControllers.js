const Product = require("../models/Product");

async function getAllProducts(req, res) {
  const product = await Product.find();
  correct;
  res.render("products/index", { product }); //correct
}

async function getProduct(req, res) {
  const id = req.params.id; //correct
  const product = await Product.findById(id); //correct

  if (!product) return res.send("Product Not Found"); //correct

  res.render("products/show", { product }); //correct
}

async function createProduct(req, res) {
  const { name, prices, description } = req.body; //correct

  if (!name || !prices || !description) return res.send("Fields are Required"); //correct
  /*
  const newProduct = {
    name,
    prices,
    description,
  };
  */

  //const product = await Product.create(newProduct); --wrong

  await Product.create({ name, prices, description });

  res.redirect("/products");
}

async function updateProduct(req, res) {
  const id = req.params.id; //correct
  const { name, prices, description } = req.body; //correct
  //const product = await Product.findByIdAndUpdate(id); --wrong

  //correct
  const product = await Product.findByIdAndUpdate(
    id,
    { name, prices, description },
    { new: true, runValidators: true }
  );

  if (!product) return res.send("Product Not Found"); //correct

  /* remove
  if (name) product.name = name;
  if (prices) product.prices = prices;
  if (description) product.description = description;
  */

  //res.redirect("products/index", { product }); -- wrong

  res.redirect(`/products/${product._id}`);
}

async function deleteProduct(req, res) {
  const id = req.params.id; // correct

  const product = await Product.findByIdAndDelete(id); //correct

  if (!product) return res.send("Product Not Found"); //correct

  //  const deleteId = splice(product, 1); -- remove

  //res.redirect("products/index", { deleteId });
  res.redirect("/products");
}

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
