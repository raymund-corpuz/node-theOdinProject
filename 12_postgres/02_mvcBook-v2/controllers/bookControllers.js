const {
  getAllBooks,
  insertNewBook,
  findOneBook,
  updateBook,
  deleteBookId,
} = require("../models/bookModels");

// show All books
async function showAllBooks(req, res) {
  try {
    const books = await getAllBooks();
    res.render("index", { books: books });
  } catch (error) {
    console.error("❌ Error occured :", error.message);
  }
}

// show form
function showForm(req, res) {
  try {
    res.render("form");
  } catch (error) {
    console.error("❌ Error occured :", error.message);
  }
}

// create book
async function

// edit book

// update book

// delete book

module.exports = { showAllBooks, showForm };
