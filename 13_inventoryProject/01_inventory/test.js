const pool = require("./db/pool");
const {
  getAllCategories,
  getOneCategory,
  updateCategory,
  deleteCategory,
  createCategory,
} = require("./models/categoryModels");
const { getAllItems, getOneItem, createItem } = require("./models/itemModels");

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

//testCategories();
async function testOneCategory() {
  try {
    const ID = 2;
    const data = await getOneCategory(ID);
    console.log("✅ One Category :", data);
  } catch (error) {
    console.error("❌ Error occured :", error.message);
  }
}

// testOneCategory();
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

async function testCreateCategory() {
  try {
    const NAME = "Monitors";
    const DESCRIPTION = "Computer screens and display panels";
    const data = await createCategory(NAME, DESCRIPTION);
    console.log("✅ Successfully Created :", data);
  } catch (error) {
    console.error("❌ Error occured :", error.message);
  }
}
//testCreateCategory();

async function testGetAllItems() {
  try {
    const data = await getAllItems();
    console.log("✅ Successfully", data);
  } catch (error) {
    console.error("❌ Error occured :", error.message);
  }
}

testGetAllItems();

async function testOneItem() {
  try {
    const ID = 19;
    const data = await getOneItem(ID);
    console.log("✅ Successful", data);
  } catch (error) {
    console.error("❌ Error occured :", error.message);
  }
}
//testOneItem();

async function testCreateItem() {
  try {
    const NAME = "HP";
    const DESCRIPTION = "Office Laptop, 16-inch display";
    const PRICE = 1890.99;
    const QUANTITY = 7;
    const USER_ID = 1;
    const data = await createItem(NAME, DESCRIPTION, PRICE, QUANTITY, USER_ID);
    console.log("✅ Successfully Created", data);
  } catch (error) {
    console.error("❌ Error occured :", error.message);
  }
}

//testCreateItem();
