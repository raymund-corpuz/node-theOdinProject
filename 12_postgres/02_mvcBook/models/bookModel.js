const pool = require("../db/pool"); //correct

// async function getAllBooks(userId) {
//   const { rows } = await pool.query("SELECT * FROM books WHERE user_id = $1", [
//     userId,
//   ]);

//   return rows;
// }

async function getAllBooks() {
  const { rows } = await pool.query("SELECT * FROM books");
  return rows;
}

/* ======= WRONG ======================
async function insertBook(title, author) {
  await pool.query("INSERT INTO books (title, author) VALUES $1,$2", [
    title,
    author,
  ]);
} */

// ============ CORRECT ================= //
async function insertBook(title, author, userId) {
  await pool.query(
    "INSERT INTO books (title, author, user_id) VALUES ($1, $2, $3)",
    [title, author, userId]
  );
}

async function deleteAllBooks() {
  // const { rows } = await pool.query("DELETE  FROM books WHERE user_id = $1", [
  //   userId,
  // ]);
  // return rows;    ===== WRONG =======

  await pool.query("DELETE FROM books");
}

module.exports = { getAllBooks, insertBook, deleteAllBooks };
