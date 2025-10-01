/*const book_db = require("../models/bookModel");

// get all books
// async function listBooks(req, res) {
//   const books = await book_db();
//   res.render("books", { title: "List of Books", books });
// }
async function listBooks(req, res) {
  const books = await book_db.getAllBooks(req.session.user.id);
  res.render("books", { title: "List of Books", books });
}

// show form add new book
function newBookForm(req, res) {
  res.render("newBook", { title: "New Book Form" });
}

// create book
async function createBook(req, res) {
  const { title, author } = req.body;

  if (!title || !author)
    return res.status(400).json({ message: "All fields are required" });

  //   const newBook = await book_db.insertBook(title, author, user_id);

  const newBook = await book_db.insertBook(title, author, req.session.user.id);

  res.status(201).json(newBook);

  res.render("books");
}

async function deleteBooks(req, res) {
  //   await book_db.deleteAllBooks();
  await book_db.deleteAllBooks(req.session.user.id);

  res.send("All books are deleted");
}

module.exports = { listBooks, newBookForm, createBook, deleteBooks };

*/

const book_db = require("../models/bookModel");

// get all books
async function listBooks(req, res) {
  const books = await book_db.getAllBooks(req.session.user.id);
  res.render("books", { title: "List of Books", books });
}

// show form add new book
function newBookForm(req, res) {
  res.render("newBook", { title: "New Book Form" });
}

// create book
async function createBook(req, res) {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: "All fields are required" });
  }

  await book_db.insertBook(title, author, req.session.user.id);

  res.redirect("/books"); // better UX
}

// delete all books
async function deleteBooks(req, res) {
  await book_db.deleteAllBooks(req.session.user.id);
  res.send("All books are deleted");
  res.redirect("/books");
}

module.exports = { listBooks, newBookForm, createBook, deleteBooks };
