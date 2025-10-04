const pool = require("../db/pool");

// Get all books
async function getAllBooks() {
  const { rows } = await pool.query("SELECT * FROM books");
  return rows;
}

// Insert new book
async function insertNewBook(title, author, year, user_id) {
  const { rows } = await pool.query(
    "INSERT INTO books (title, author, year, user_id) VALUES ($1,$2,$3,$4)",
    [title, author, year, user_id]
  );
  return rows[0];
}

// find one book
// Update book
//delete book

//export
module.exports = { getAllBooks, insertNewBook };
