const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

//middleware to parse JSON
app.use(express.json());

//Path to our storage file.
const DATA_FILE = path.join(__dirname, "notes.json");

//Read data from file.
function readData() {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return []; //if file not found or empty
  }
}

//write data to file
function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

//Get all notes
app.get("/notes", (req, res) => {
  const notes = readData();
  res.status(200).json(notes);
});

//get single Note ID
app.get("/notes/:id", (req, res) => {
  const notes = readData();
  const note = notes.find((n) => n.id === parseInt(req.params.id));

  if (!note) return res.status(404).json({ message: "Note not found" });

  res.status(200).json(note);
});

//Add new note
app.post("/notes", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  const notes = readData();
  const newNote = {
    id: notes.length > 0 ? notes[notes.length - 1].id + 1 : 1, //auto increment
    title,
    content,
  };

  notes.push(newNote);
  writeData(notes);

  res.status(201).json(newNote);
});

//update a note by ID
app.put("/notes/:id", (req, res) => {
  const { title, content } = req.body;
  const notes = readData();
  const note = notes.find((n) => n.id === parseInt(req.params.id));

  if (!note) return res.status(404).json({ message: "Note Not Found" });

  if (title) note.title = title;
  if (content) note.content = content;

  writeData(notes);

  res.status(200).json(note);
});

app.delete("/notes/:id", (req, res) => {
  const notes = readData();
  const index = notes.findIndex((n) => n.id === parseInt(req.params.id));

  if (index === -1) res.status(404).json({ message: "Note Not Found" });

  const deleteNote = notes.splice(index, 1);
  writeData(notes);
  res.status(200).json(deleteNote[0]);
});

app.listen(PORT, () => {
  console.log(`🚀Server is running at http://localhost:${PORT}`);
});
