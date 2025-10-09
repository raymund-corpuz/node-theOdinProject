const pool = require("../config/db");

//createUser(username, hashedPassword)
async function createUser(username, hashedPassword) {
  const { rows } = await pool.query("SELECT * FROM users");
  return rows[0];
}

//findUserByUsername(username)
async function findUserByUsername(username) {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE username = $1 ",
    [username]
  );
  return rows[0];
}

//findUserById(id)
async function findUserById(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0];
}

//export all functions
module.exports = { createUser, findUserByUsername, findUserById };
