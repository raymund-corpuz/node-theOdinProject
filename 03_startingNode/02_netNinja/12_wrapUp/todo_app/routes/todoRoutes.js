const express = require("express");
const router = express.Router();
const {
  getTodos,
  addTodo,
  deleteTodo,
} = require("../controllers/todoController");

//Get All todos
router.get("/", getTodos);

//Post new Todo
router.post("/add", addTodo);

//Delete todo
router.post("/delete/:id", deleteTodo);

module.exports = router;
