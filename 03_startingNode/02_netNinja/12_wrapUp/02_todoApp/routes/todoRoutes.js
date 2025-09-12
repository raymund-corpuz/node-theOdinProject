// const express = require("express");
// const router = express.Router();
// const {
//   getTodos,
//   addTodo,
//   deleteTodo,
// } = require("../controllers/todoController");

// //Get all todos;
// router.get("/", getTodos);

// //add new todo
// router.post("/add", addTodo);

// //delete todo
// router.post("/delete/:id", deleteTodo);

// module.exports = router;

const express = require("express");
const router = express.Router();
const {
  getTodos,
  addTodo,
  deleteTodo,
} = require("../controllers/todoController");

router.get("/", getTodos);

router.post("/add", addTodo);

router.post("/delete/:id", deleteTodo);

module.exports = router;
