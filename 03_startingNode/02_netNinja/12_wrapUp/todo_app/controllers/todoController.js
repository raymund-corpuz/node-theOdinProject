const Todo = require("../models/todoModel");

// @desc Show all todos
exports.getTodos = async (req, res) => {
  const todos = await Todo.find();
  res.render("index", { todos });
};

// @desc Add new todo
exports.addTodo = async (req, res) => {
  const { task } = req.body;

  if (!task) return res.redirect("/");

  await Todo.create({ task });

  res.redirect("/");
};

// @desc Delete todo
exports.deleteTodo = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.redirect("/");
};
