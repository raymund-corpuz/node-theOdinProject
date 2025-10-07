const pool = require("../db/pool");

//getAllItems,
async function getAllItems() {
  const { rows } = await pool.query("SELECT * FROM items");
  return rows;
}
// getOneItem,
async function getOneItem(id) {
  const { rows } = await pool.query("SELECT * FROM items WHERE id= $1 ", [id]);
  return rows[0];
}
//createItem,
async function createItem(name, description, price, quantity, category_id) {
  const { rows } = await pool.query(
    "INSERT INTO items (name, description, price, quantity, category_id) VALUES ($1, $2,$3, $4, $5)  RETURNING *",
    [name, description, price, quantity, category_id]
  );
  return rows[0];
}
// updateItem,
async function updateItem(name, description, price, quantity, category_id, id) {
  const { rows } = await pool.query(
    "UPDATE items SET name=$1, description=$2, price=$3, quantity=$4, category_id = $5 WHERE id= $6 RETURNING *",
    [name, description, price, quantity, category_id, id]
  );
  return rows[0];
}
//deleteItem,
async function deleteItem(id) {
  const { rows } = await pool.query(
    "DELETE FROM items WHERE id=$1 RETURNING*",
    [id]
  );
  return rows[0];
}

//get items user_id
async function getCategoryId(categoryId) {
  const { rows } = await pool.query(
    "SELECT * FROM items WHERE category_id =  $1",
    [categoryId]
  );
  return rows;
}

module.exports = {
  getAllItems,
  getOneItem,
  createItem,
  updateItem,
  deleteItem,
  getCategoryId,
};
