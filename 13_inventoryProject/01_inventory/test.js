const pool = require("./db/pool");
const {
  getAllCategories,
  getOneCategory,
  updateCategory,
  deleteCategory,
} = require("./models/categoryModels");

async function testDB() {
  try {
    const data = await pool.query("SELECT * FROM categories");
    console.log("✅ CATEGORIES :", data);
    process.exit();
  } catch (error) {
    console.error("❌ Error occured :", error.message);
  }
}

//testDB();

async function testCategories() {
  try {
    const data = await getAllCategories();
    console.log("✅ TEST CATEGORIES", data);
  } catch (error) {
    console.error("❌ Error occured :", error.message);
  }
}

testCategories();
async function testOneCategory() {
  try {
    const ID = 2;
    const data = await getOneCategory(ID);
    console.log("✅ One Category :", data);
  } catch (error) {
    console.error("❌ Error occured :", error.message);
  }
}

//testOneCategory();
async function testUpdateCategory() {
  try {
    const ID = 5;
    const NAME = "Gadgets";
    const DESCRIPTION = "Electronic gadgets";

    const data = await updateCategory(ID, NAME, DESCRIPTION);
    console.log("✅ UPDATED", data);
  } catch (error) {
    console.error("❌ Error occured :", error.message);
  }
}
// testUpdateCategory();

async function testDeleteCategory() {
  try {
    const ID = 5;
    const data = await deleteCategory(ID);
    console.log("✅ SUCCESSFULLY DELETED", data);
  } catch (error) {
    console.error("❌ Error occured :", error.message);
  }
}
// testDeleteCategory();
