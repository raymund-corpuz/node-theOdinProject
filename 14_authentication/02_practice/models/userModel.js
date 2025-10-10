const pool = require("../config/db"); // correct

//createUser(username, hashedPassword)
async function createUser(username, hashedPassword) {
  const { rows } = await pool.query(
    "INSERT INTO users (username, password) VALUES ($1,$2)",
    [username, hashedPassword]
  );
  return rows[0];
}

//findUserByUsername(username)
async function findUserByUsername(username) {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE username = $1 ",
    [username]
  );
  return rows[0]; //correct
}

//findUserById(id)
async function findUserById(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0]; //correct
}

//export all functions
module.exports = { createUser, findUserByUsername, findUserById };
