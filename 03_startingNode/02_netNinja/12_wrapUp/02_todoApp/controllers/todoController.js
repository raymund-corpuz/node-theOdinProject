// const Todo = require("../models/todoModel");

// //show All todos
// exports.getTodos = async (req, res) => {
//   const todos = await Todo.find();
//   res.render("index", { todos });
// };

// //add new todo
// exports.addTodo = async (req, res) => {
//   const { task } = req.body;

//   if (!task) return res.redirect("/");

//   await Todo.create({ task });
//   res.redirect("/");
// };

// exports.deleteTodo = async (req, res) => {
//   await Todo.findByIdAndDelete(req.params.id);
//   res.redirect("/");
// };

// const Todo = require("../models/todoModel");

// //show all todos
// exports.getTodos = async (req, res) => {
//   const todos = await Todo.find();
//   res.render("index", { todos });
// };

// exports.addTodo = async (req, res) => {
//   const { task } = req.body;

//   if (!task) return res.redirect("/");

//   await Todo.create({ task });
//   res.redirect("/"); //missing
// };

// exports.deleteTodo = async (req, res) => {
//   const deleted = await Todo.findByIdAndDelete(req.params.id);

//   res.redirect("/");
// };

// const Todo = require("../models/todoModel");

// exports.getTodos = async (req, res) => {
//   try {
//     const todos = await Todo.find();
//     res.render("index", { todos });
//   } catch (err) {
//     console.error("Error fetching todos: ", err);
//     res.status(500).send("Server error");
//   }
// };

// exports.addTodo = async (req, res) => {
//   try {
//     const { task } = req.body;

//     if (!task) return res.redirect("/");
//     await Todo.create({ task });
//     res.redirect("/");
//   } catch (err) {
//     console.error("Error adding todo:", err);
//     res.status(500).send("Server error");
//   }
// };

// exports.deleteTodo = async (req, res) => {
//   try {
//     const deleted = await Todo.findByIdAndDelete(req.params.id);
//     res.redirect("/");
//   } catch (err) {
//     console.error("Error deleting", err);
//     res.status(500).send("Server error");
//   }
// };

const Todo = require("../models/todoModel");

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();

    res.render("index", { todos });
  } catch (err) {
    console.error("Error occured", err);
  }
};

exports.addTodo = async (req, res) => {
  try {
    const { task } = req.body;

    if (!task) return res.redirect("/");

    await Todo.create({ task });
    res.redirect("/");
  } catch (err) {
    console.error("Error occured", err);
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (err) {
    console.error("Error occured", err);
  }
};
