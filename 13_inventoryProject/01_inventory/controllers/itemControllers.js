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
//itemDetails,
//editIte,
// itemUpdate,
//  itemDelete,

module.exports = { showAllItems, showItemForm };
