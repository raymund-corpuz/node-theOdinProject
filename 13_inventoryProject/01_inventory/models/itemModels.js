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
//deleteItem,

module.exports = { getAllItems, getOneItem, createItem };
