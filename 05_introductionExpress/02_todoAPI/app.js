const express = require("express");

const app = express();

const PORT = 8080;

//middleware
app.use(express.json());

let todoList = [
  { id: 1, task: "Programming", completed: false },
  { id: 2, task: "Create Express App", completed: false },
];

// ============ get all todos ===================== //
app.get("/show-all", (req, res) => {
  try {
    // =================== correct ====================== //
    /* if (todoList.length === 0)
        return res.status(200).json({ message: "No task found" }); */

    // === wrong === //
    if (todoList === null)
      return res.status(200).json({ message: "No task found" });

    res.status(200).json(todoList);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Bad Request" });
  }
});
// ============ add new task ====================== //
app.post("/add-task", (req, res) => {
  try {
    const { task } = req.body;
    if (!task) return res.status(400).json({ message: "Place a task" });

    const newTask = {
      id: todoList.length + 1,
      task,
      completed: false,
    };

    todoList.push(newTask);
    res.status(201).json(newTask);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Bad Request" });
  }
});
// ============ update todo by id ================= //
app.put("/update-task/:id", (req, res) => {
  try {
    // ==================== correct way ================= //
    // const todo = todoList.find((t) => t.id === parseInt(req.params.id));
    //  if (!todo) return res.status(404).json({ message: "No task found" });
    // const { task, completed } = req.body;
    const { task } = req.body;
    const taskId = todoList.find((task) => task.id === parseInt(req.params.id));

    if (!taskId) return res.status(404).json({ message: "No task found" });
    if (task) taskId.task = task;

    // ============= missing ===================//
    /* if (typeof completed === "boolean") todo.completed = completed; */

    res.status(200).json(taskId);
  } catch (err) {
    res.status(404).json({ message: "Task is not found" });
  }
});
// ============ delete todo by id ================= //
app.delete("/delete-task/:id", (req, res) => {
  try {
    const taskId = todoList.findIndex(
      (task) => task.id === parseInt(req.params.id)
    );

    if (taskId === -1)
      return res.status(404).json({ message: "No Task Found" });

    const deleteTask = todoList.splice(taskId, 1);
    res.status(200).json(deleteTask[0]);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Task is not found" });
  }
});

//listen to server
app.listen(PORT, () => {
  console.log(`🚀Server is running http://localhost:${PORT}`);
});
