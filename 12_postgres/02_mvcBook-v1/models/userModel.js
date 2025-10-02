const pool = require("../db/pool");

async function createUser(username, passwordHash) {
  const { rows } = await pool.query(
    "INSERT INTO users (username, password_hash) VALUES ($1,$2) RETURNING *",
    [username, passwordHash]
  );

  return rows[0];
}

async function findUserByUsername(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return rows[0];
}

module.exports = { createUser, findUserByUsername };
