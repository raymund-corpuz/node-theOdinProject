/*IMPORT database pool

FUNCTION createUser(username, hashedPassword)
  EXECUTE SQL: INSERT INTO users (username, password) VALUES ($1, $2)

FUNCTION findUserByUsername(username)
  EXECUTE SQL: SELECT * FROM users WHERE username = $1

FUNCTION findUserById(id)
  EXECUTE SQL: SELECT * FROM users WHERE id = $1
*/

const pool = require("../db/pool");

async function createUser(username, hashedPassword) {
  const { rows } = await pool.query(
    "INSERT INTO users (username,password) VALUES ($1, $2) RETURNING *",
    [username, hashedPassword]
  );
  return rows[0];
}

async function finduserByUsername(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return rows[0];
}

async function findUserById(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0];
}

module.exports = { createUser, finduserByUsername, findUserById };
