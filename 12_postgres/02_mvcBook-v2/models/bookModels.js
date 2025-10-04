const pool = require("../db/pool");

// Get all books
async function getAllBooks() {
  const { rows } = await pool.query("SELECT * FROM books");
  return rows;
}

// Insert new book
async function insertNewBook(title, author, year, user_id) {
  const { rows } = await pool.query(
    "INSERT INTO books (title, author, year, user_id) VALUES ($1,$2,$3,$4) RETURNING *",
    [title, author, year, user_id]
  );
  return rows[0];
}

// find one book
async function findOneBook(id) {
  const { rows } = await pool.query("SELECT * FROM books WHERE id = $1 ", [id]);
  return rows[0];
}

// Update book
async function updateBook(id, title, author, year) {
  const result = await pool.query(
    "UPDATE books SET title=$1, author=$2, year=$3 WHERE id=$4 RETURNING *",
    [title, author, year, id]
  );

  return result.rows[0];
}

//delete book
async function deleteBookId(id) {
  const { rows } = await pool.query(
    "DELETE FROM books WHERE id = $1 RETURNING",
    [id]
  );
  return rows[0];
}

//export
module.exports = {
  getAllBooks,
  insertNewBook,
  findOneBook,
  updateBook,
  deleteBookId,
};
