const categoryModels = require("../models/categoryModels");

//showAll
exports.showAll = async (req, res) => {
  try {
    const categories = await categoryModels.getAllCategories();
    res.render("caategories/list", { title: "Categories", categories });
  } catch (error) {
    console.error("❌ Error occured in show all controller:", error.message);
  }
};

//showForm

//create

//editForm

//update

//delete
