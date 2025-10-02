const pool = require("./db/pool");
const { findUserByUsername, createUser } = require("./models/userModel");

async function test() {
  const { rows } = await pool.query("SELECT * FROM books");
  console.log(rows);
  process.exit();
}

async function findUser() {
  const USERNAME = "manuel";
  const user = await findUserByUsername(USERNAME);

  console.log(user);
}
findUser();

async function cUser() {
  const NEW_USER = "manuel";
  const PASSWORD = "qwerty123";
  await createUser(NEW_USER, PASSWORD);

  console.log("✅ User successfully added");

  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
    NEW_USER,
  ]);

  console.log(rows);
}
