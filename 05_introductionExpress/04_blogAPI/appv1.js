const express = require("express"); //correct
const mongoose = require("mongoose"); // correct

const PORT = process.env.PORT || 3000; // correct

const app = express(); //correct

const MONGO_URI = "uri<username>/ <passwor>"; //correct

//middleware
app.use(express.json()); // correct

//connect MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(`✅ Successfully connected to Mongo DB`);
  })
  .catch((err) => {
    console.error("❌ Failed to connect", err.message);
  });

const Post = require("./models/postv1");

//get all post
app.get("/posts", async (req, res) => {
  try {
    const { author } = req.query;

    const filter = author ? { author } : {};

    const posts = await Post.find(filter);

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Post Not Found" });
  }
});

//create a post
app.post("/posts", async (req, res) => {
  try {
    const { title, body, author } = req.body;

    if (!title || !body || !author)
      return res.status(404).json({ message: "Fields are Required" });

    const newPost = new Post({ title, author, body });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    return res.status(500).json({ message: "Post Not Found" });
  }
});

//view single post
app.get("/posts/:id", async (req, res) => {
  try {
    const singlePost = await Post.findById(req.params.id);

    if (!singlePost) return res.status(404).json({ message: "Post Not Found" });

    res.status(200).json(singlePost);
  } catch (error) {
    return res.status(500).json({ message: "Post Not Found" });
  }
});

//update a post
app.put("/posts/:id", async (req, res) => {
  try {
    const { title, body, author } = req.body;

    const updatePost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, body, author },
      { new: true, runValidators: true }
    );

    if (!updatePost) return res.status(404).json({ message: "Post Not Found" });

    res.status(200).json(updatePost);

    // const updatePost = await Post.findById(req.params.id);

    // if (!updatePost) return res.status(404).json({ message: "Post Not Found" });

    // if (title) updatePost.title = title;
    // if (body) updatePost.body = body;
    // if (author) updatePost.author = body;

    // res.status(200).json(updatePost);
  } catch (error) {
    return res.status(500).json({ message: "Post Not Found" });
  }
});

//delete a post
app.delete("/posts/:id", async (req, res) => {
  try {
    const deleteId = await Post.findByIdAndDelete(req.params.id);

    if (!deleteId) return res.status(404).json({ message: "Post Not Found" });

    res.json({ message: " Post Deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Post Not Found" });
  }
});

//listen

app.listen(PORT, () => {
  console.log(`🚀 Server is Running at http://localhost:${PORT}`);
});
