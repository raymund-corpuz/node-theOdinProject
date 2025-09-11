// const mongoose = require("mongoose");

// const todoSchema = new mongoose.Schema({
//   task: {
//     type: String,
//     required: true,
//     trim: true,
//   },
// });

// module.exports = mongoose.model("Todo", todoSchema);

const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
    trim: true,
  },
});

exports.module = mongoose.model("Todo", todoSchema);
