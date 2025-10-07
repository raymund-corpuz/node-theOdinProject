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
  try {
    const categories = await categoryModels.getAllCategories();
    const item = await itemModels.getAllItems();
    res.render("items/form", { title: "Item Form", item, categories });
  } catch (error) {
    console.error("❌ Error occured :", error.message);
  }
}

// createItem,
async function createItem(req, res) {
  try {
    const { name, description, price, quantity, category_id } = req.body;

    await itemModels.createItem(
      name,
      description,
      price,
      quantity,
      category_id
    );

    res.redirect("/items/list");
  } catch (error) {
    console.error("❌ Error occured :", error.message);
  }
}
//itemDetails,
//editItem,
async function editItemForm(req, res) {
  try {
    const { id } = req.params;
    const categories = await categoryModels.getAllCategories();
    const item = await itemModels.getOneItem(id);
    res.render("items/edit", { title: "Edit Items", item, categories });
  } catch (error) {
    console.error("❌ Error occured :", error.message);
  }
}
// itemUpdate,
async function itemUpdate(req, res) {
  try {
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
  } catch (error) {
    console.error("❌ Error occured :", error.message);
  }
}
//  itemDelete,
async function itemDelete(req, res) {
  try {
    const { id } = req.params;
    await itemModels.deleteItem(id);
    res.redirect("/items/list");
  } catch (error) {
    console.error("❌ Error occured :", error.message);
  }
}

module.exports = {
  showAllItems,
  showItemForm,
  createItem,
  itemUpdate,
  editItemForm,
  itemDelete,
};
