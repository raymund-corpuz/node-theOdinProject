const express = require("express");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const app = express();

const DATA_FILE = path.join(__dirname, "notes.json");

//middleware
app.use(express.json());

function readData() {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf-8"); //corrected
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return [];
  }
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

// Get all

app.get("/notes", (req, res) => {
  try {
    const notes = readData();

    if (notes === 0) res.status(404).json({ message: "Notes are Empty" });
    res.status(200).json(notes);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Notes Not Found" });
  }
});
// create note
app.post("/create-notes", (req, res) => {
  try {
    const notes = readData();

    const { title, content } = req.body;

    if (!title || !content)
      return res.status(400).json({ message: "Title and Content is required" });

    const newNote = {
      id: notes.length > 0 ? notes[notes.length - 1].id + 1 : 1,
      title,
      content,
    };

    notes.push(newNote);
    writeData(notes);
    res.status(201).json(notes);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Notes Not Found" });
  }
});
// update note
app.put("/update-notes/:id", (req, res) => {
  try {
    const notes = readData();
    const { title, content } = req.body; //corrected

    const notesId = notes.find((n) => n.id === parseInt(req.params.id));

    if (!notesId) return res.status(404).json({ message: "Notes Not Found" });

    if (title) notesId.title = title;
    if (content) notesId.content = content;

    writeData(notes);
    res.status(200).json(notes);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Notes Not Found" });
  }
});
// delete note
app.delete("/delete-notes/:id", (req, res) => {
  try {
    const notes = readData();

    const index = notes.findIndex((n) => n.id === parseInt(req.params.id));

    if (index === -1)
      return res.status(404).json({ message: "Notes Not Found" });

    const deleteId = notes.splice(index, 1);
    writeData(notes); // corrected

    res.status(200).json(deleteId[0]); //corrected
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Notes Not Found" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
