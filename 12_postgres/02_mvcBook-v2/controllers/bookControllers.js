// const {
//   getAllBooks,
//   insertNewBook,
//   findOneBook,
//   updateBook,
//   deleteBookId,
// } = require("../models/bookModels");

// // show All books
// async function showAllBooks(req, res) {
//   try {
//     const books = await getAllBooks();
//     res.render("index", { books: books });
//   } catch (error) {
//     console.error("❌ Error occured :", error.message);
//   }
// }

// // show form
// function showForm(req, res) {
//   try {
//     res.render("form");
//   } catch (error) {
//     console.error("❌ Error occured :", error.message);
//   }
// }

// // create book
// async function createNewBook(req, res) {
//   try {
//     const { title, author, year } = req.body;
//     const userId = req.session.user.id;
//     await insertNewBook(title, author, year, userId);
//     res.redirect("/books");
//   } catch (error) {
//     console.error("❌ Error occured :", error.message);
//   }
// }

// // render book
// async function editBook(req, res) {
//   try {
//     const book = await findOneBook(req.params.id);
//     res.render("edit", { book: book });
//   } catch (error) {
//     console.error("❌ Error occured :", error.message);
//   }
// }

// // update book
// async function updateBookId(req, res) {
//   try {
//     const { title, author, year } = req.body;
//     await updateBook(req.params.id, title, author, year);

//     res.redirect("/books");
//   } catch (error) {
//     console.error("❌ Error occured :", error.message);
//   }
// }

// // delete book
// async function bookDelete(req, res) {
//   try {
//     // await deleteBookId(req.params.id);
//     // res.redirect("/books");

//     const { id } = req.params;
//     const result = await deleteBookId(id);

//     // If deleteBookId returns something like rowCount or rows
//     if (result.rowCount === 0) {
//       return res.status(404).send("⚠️ Book not found");
//     }

//     res.redirect("/books");
//   } catch (error) {
//     console.error("❌ Error occured :", error.message);
//   }
// }

// module.exports = {
//   showAllBooks,
//   showForm,
//   createNewBook,
//   updateBookId,
//   editBook,
//   bookDelete,
// };

const {
  getAllBooks,
  insertNewBook,
  findOneBook,
  updateBook,
  deleteBookId,
} = require("../models/bookModels");

//show all books
async function showAllBooks(req, res) {
  const books = await getAllBooks();
  res.render("index", { books: books });
}

//show form
function showForm(req, res) {
  res.render("form");
}

// createNewBook,
async function createNewBook(req, res) {
  try {
    const { title, author, year } = req.body;
    const userId = req.params.id;
    await insertNewBook(title, author, year, userId);

    res.redirect("/books");
  } catch (error) {
    console.error("❌ Error occured :", error.message);
  }
}

//editBook
async function editBook(req, res) {
  const book = await findOneBook(req.params.id); //missing
  res.render("edit", { book: book });
}

//updateBookId
async function updateBookId(req, res) {
  try {
    const { title, author, year } = req.body;
    // const userId = await findOneBook(req.params.id); -- wrong
    await updateBook(req.params.id, title, author, year);
    res.redirect("/books");
  } catch (error) {
    console.error("❌ Error occured :", error.message);
  }
}

//delete book
async function bookDelete(req, res) {
  try {
    const { id } = req.params;
    const result = await deleteBookId(id);

    if (result.rowCount === 0) {
      return res.status(400).send("❌ Book not found");
    }

    res.redirect("/books");
  } catch (error) {
    console.error("❌ Error occured :", error.message);
  }
}

module.exports = {
  showAllBooks,
  showForm,
  createNewBook,
  updateBookId,
  editBook,
  bookDelete,
};
