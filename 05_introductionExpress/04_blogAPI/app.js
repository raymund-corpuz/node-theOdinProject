const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 8080;

//middleware
app.use(express.json());

//mongoDB Connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(`🚀 Successfully connected to MONGO DB`);
  })
  .catch((err) => {
    console.err("Error occured", err);
  });

const Post = require("./models/post");

//CREATE (POST/ posts)

app.post("/posts", async (req, res) => {
  try {
    const { title, body, author } = req.body;

    if (!title || !body || !author)
      return res.status(400).json({ message: "All fields are required" });

    const post = new Post({ title, body, author });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ALL
app.get("/posts", async (req, res) => {
  try {
    const { author } = req.query; //filter
    const filter = author ? { author } : {};
    const posts = await Post.find(filter);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE (GET /posts/:id)
app.get("posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE (PUT /posts/:id)
app.put("/posts/:id", async (req, res) => {
  try {
    const { title, body, author } = req.body;

    const post = new Post.findByIdAndUpdate(
      req.params.id,
      {
        title,
        body,
        author,
      },
      { new: true, runValidators: true }
    );

    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//DELETE (Delete /posts/:id)
app.delete("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is Running at http://localhost:${PORT}`);
});
