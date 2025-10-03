const pool = require("../db/pool");

async function createUser(username, email, password) {
  const { rows } = await pool.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2,$3) RETURNING *",
    [username, email, password]
  );
  return rows[0];
}

async function findUserByEmail(email) {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
}

module.exports = { createUser, findUserByEmail };
