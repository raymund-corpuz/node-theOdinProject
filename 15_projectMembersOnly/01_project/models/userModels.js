const pool = require("../db/pool");

//showAllUsers
async function showAllUsers() {
  const { rows } = await pool.query("SELECT * FROM users");
  return rows;
}

//createUser
async function createUser(
  first_name,
  last_name,
  username,
  password,
  membership_status,
  is_admin
) {
  const { rows } = await pool.query(
    "INSERT INTO users (first_name, last_name, username, password, membership_status, is_admin) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
    [first_name, last_name, username, password, membership_status, is_admin]
  );
  return rows[0];
}

//getUserByUsername
async function getUserByUsername(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return rows[0];
}

//getUserById
async function getUserById(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
  return rows[0];
}

//export
module.exports = { showAllUsers, createUser, getUserByUsername, getUserById };
