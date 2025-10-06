const pool = require("../db/pool");

//get All categories
async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}
//get one category
async function getOneCategory(id) {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows[0];
}
//insert new category
async function createCategory(name, description) {
  const { rows } = await pool.query(
    "INSERT INTO categories (name, description)VALUES ($1, $2) RETURNING *",
    [name, description]
  );
  return rows[0];
}

//update category
async function updateCategory(id, name, description) {
  const { rows } = await pool.query(
    "UPDATE categories SET  name=$1, description=$2  WHERE id=$3 RETURNING *",
    [name, description, id]
  );
  return rows[0];
}
//delete category
async function deleteCategory(id) {
  const { rows } = await pool.query(
    "DELETE FROM categories WHERE id=$1 RETURNING*",
    [id]
  );
  return rows[0];
}

//export category

module.exports = {
  getAllCategories,
  getOneCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
