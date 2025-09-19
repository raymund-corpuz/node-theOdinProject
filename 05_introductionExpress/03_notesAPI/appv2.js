const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;
const DATA_FILE = path.join(__dirname, "notes.json");

//middleware

app.use(express.json());

//function

function readData() {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

//routes

// CREATE
app.post("/notes", (req, res) => {
  try {
    const notes = readData();
    const { title, content } = req.body;

    if (!title || !content)
      return res
        .status(400)
        .json({ message: "Title and Content is required!" });

    const newNote = {
      id: notes.length > 0 ? notes[notes.length - 1].id + 1 : 1,
      title,
      content,
    };

    notes.push(newNote);
    writeData(notes);

    res.status(201).json(notes);
  } catch (err) {
    return res.status(404).json({ message: "Notes Not Found" });
  }
});
// READ
app.get("/notes", (req, res) => {
  try {
    const notes = readData();

    if (notes.length === 0)
      return res.status(404).json({ message: "Notes is Empty" });

    res.status(200).json(notes);
  } catch (err) {
    return res.status(404).json({ message: "Notes Not Found" });
  }
});
// UPDATE
app.put("/notes/:id", (req, res) => {
  try {
    const notes = readData();

    const updateId = notes.find((n) => n.id === parseInt(req.params.id));

    if (!updateId) return res.status(404).json({ message: "Notes Not Found" });

    const { title, content } = req.body;

    if (title) updateId.title = title;
    if (content) updateId.content = content;

    writeData(notes);

    res.status(200).json(notes);
  } catch (err) {
    return res.status(404).json({ message: "Notes Not Found" });
  }
});
// DELETE
app.delete("/notes/:id", (req, res) => {
  try {
    const notes = readData();
    const index = notes.findIndex((n) => n.id === parseInt(req.params.id));

    if (index === -1)
      return res.status(404).json({ message: "Notes Not Found" });

    const deleteId = notes.splice(index, 1);
    writeData(notes);
    res.status(200).json(deleteId[0]);
  } catch (err) {
    return res.status(404).json({ message: "Notes Not Found" });
  }
});

//listen
app.listen(PORT, () => {
  console.log(`🚀 Server is Running at http://localhost:${PORT}`);
});
