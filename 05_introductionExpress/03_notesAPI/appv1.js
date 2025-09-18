const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, "notes.json");

// MIDDLEWARE
app.use(express.json());

function readData() {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function writeData(data) {
  fs.readFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

// CREATE
app.post("/create-notes", (req, res) => {
  try {
    const notes = readData();
    const { title, content } = req.body;

    if (!title || !content)
      return res
        .status(400)
        .json({ message: "Title and Content is Required!" });

    const newNote = {
      id: notes.length > 0 ? notes[notes.length - 1].id + 1 : 1,
      title,
      content,
    };

    notes.push(newNote);
    writeData(notes);
    res.status(201).json(notes);
  } catch (err) {
    res.status(404).json({ message: "Notes Not Found" });
  }
});

// READ
app.get("/get-notes", (req, res) => {
  try {
    const notes = readData();

    if (notes.length === 0)
      return res.status(404).json({ message: "Notes is Empty!" });

    res.status(200).json(notes);
  } catch (err) {
    res.status(404).json({ message: "Notes Not Found" });
  }
});

// UPDATE
app.put("/update-notes/:id", (req, res) => {
  try {
    const notes = readData();
    const noteId = notes.find((n) => n.id === parseInt(req.params.id));

    if (!noteId) return res.status(404).json({ message: "Notes Not Found" });
    const { title, content } = req.body;

    if (title) noteId.title = title;
    if (content) noteId.content = content;

    writeData(notes);

    res.status(200).json(notes);
  } catch (err) {
    res.status(404).json({ message: "Notes Not Found" });
  }
});
// DELETE
app.delete("/delete-notes/:id", (req, res) => {
  try {
    const notes = readData();

    const index = notes.findIndex((n) => n.id === parseInt(req.params.id));

    if (index === -1)
      return res.status(404).json({ message: "Notes Not Found" });

    const deleteId = notes.splice(index, 1);
    writeData(notes);

    res.status(200).json(deleteId[0]);
  } catch (err) {
    res.status(404).json({ message: "Notes Not Found" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is Running at http://localhost:${PORT}`);
});
