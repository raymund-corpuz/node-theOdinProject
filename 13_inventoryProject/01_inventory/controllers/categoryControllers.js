const categoryModels = require("../models/categoryModels");
const itemModels = require("../models/itemModels");

//show index
async function showIndex(req, res) {
  const categories = await categoryModels.getAllCategories();
  res.render("index", {
    title: "Categories",
    categories,
  });
}

//showAll
async function showAll(req, res) {
  try {
    const categories = await categoryModels.getAllCategories();
    res.render("categories/list", {
      title: "Categories",
      categories,
    });
  } catch (error) {
    console.error("❌ Error occured in show all controller:", error.message);
  }
}

//showForm
function showForm(req, res) {
  try {
    res.render("categories/form", { title: "Form Create Category" });
  } catch (error) {
    console.error("❌ Error occured in show all controller:", error.message);
  }
}

//create
async function create(req, res) {
  try {
    const { name, description } = req.body;
    await categoryModels.createCategory(name, description);

    res.redirect("/categories");
  } catch (error) {
    console.error("❌ Error occured in show all controller:", error.message);
  }
}

// category details
async function categoryDetails(req, res) {
  const { id } = req.params;
  const category = await categoryModels.getOneCategory(id);

  const items = await itemModels.getCategoryId(id);
  res.render("categories/detail", {
    title: "Detail Category",
    category,
    items,
  });
}

//editForm
async function editForm(req, res) {
  try {
    const { id } = req.params;
    const category = await categoryModels.getOneCategory(id);

    res.render("categories/edit", { title: "Edit Category", category });
  } catch (error) {
    console.error("❌ Error occured in show all controller:", error.message);
  }
}

//update
async function categoryUpdate(req, res) {
  const { id } = req.params;
  const { name, description } = req.body;
  await categoryModels.updateCategory(id, name, description);
  res.redirect("/categories");
}

//delete
async function categoryDelete(req, res) {
  const { id } = req.params;
  await categoryModels.deleteCategory(id);

  res.redirect("/categories");
}

module.exports = {
  showIndex,
  showAll,
  showForm,
  create,
  categoryDetails,
  editForm,
  categoryUpdate,
  categoryDelete,
};
