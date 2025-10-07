const categoryModels = require("../models/categoryModels");
const itemModels = require("../models/itemModels");

//showAllItems,
async function showAllItems(req, res) {
  try {
    const items = await itemModels.getAllItems();

    res.render("items/list", { title: "All Items", items });
  } catch (error) {
    console.error("❌ Error occured :", error.message);
  }
}

//showItemForm,
async function showItemForm(req, res) {
  const categories = await categoryModels.getAllCategories();
  const item = await itemModels.getAllItems();
  res.render("items/form", { title: "Item Form", item, categories });
}

// createItem,
async function createItem(req, res) {
  const { name, description, price, quantity, category_id } = req.body;

  await itemModels.createItem(name, description, price, quantity, category_id);

  res.redirect("/items/list");
}
//itemDetails,
//editItem,
async function editItemForm(req, res) {
  const { id } = req.params;
  const categories = await categoryModels.getAllCategories();
  const item = await itemModels.getOneItem(id);
  res.render("items/edit", { title: "Edit Items", item, categories });
}
// itemUpdate,
async function itemUpdate(req, res) {
  const { name, description, price, quantity, category_id } = req.body;
  const { id } = req.params;
  await itemModels.updateItem(
    name,
    description,
    price,
    quantity,
    category_id,
    id
  );
  res.redirect("/items/list");
}
//  itemDelete,

module.exports = {
  showAllItems,
  showItemForm,
  createItem,
  itemUpdate,
  editItemForm,
};
