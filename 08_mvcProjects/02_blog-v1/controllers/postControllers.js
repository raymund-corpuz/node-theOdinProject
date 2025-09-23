let posts = require("../models/Posts"); // == correct

function getAllPosts(req, res) {
  try {
    res.render("posts/index", { posts }); // == correct
  } catch (error) {
    res.status(500).json({ message: "Cant connect to the network❌" });
  }
}

function getPostById(req, res) {
  try {
    const id = parseInt(req.params.id);
    const post = posts.find((p) => p.id === id);

    if (!post) return res.status(404).json({ message: "Post Not Found" });

    res.render("posts/show", { post });
  } catch (error) {
    res.status(500).json({ message: "Cant connect to the network❌" });
  }
}

function createPost(req, res) {
  try {
    const { title, content, author } = req.body;

    if (!title || !content || !author)
      return res.status(404).json({ message: "Fields are required" });

    const newPost = {
      id: posts.length ? posts[posts.length - 1].id + 1 : 1,
      title,
      content,
      author,
    };

    posts.push(newPost);

    // res.render("posts/index");  ---- wrong
    res.redirect("/posts");
  } catch (error) {
    res.status(500).json({ message: "Cant connect to the network❌" });
  }
}

function updatePost(req, res) {
  try {
    const id = parseInt(req.params.id); // --correct

    const post = posts.find((p) => p.id === id); // -- correct

    if (!post) return res.status(404).json({ message: "Post Not Found" }); // -- correct

    const { title, content, author } = req.body; // -- correct
    if (title) post.title = title;
    if (content) post.content = content;
    if (author) post.author = author;

    //res.render("post/index");   -- wrong
    res.redirect(`/posts/${id}`);
  } catch (error) {
    res.status(500).json({ message: "Cant connect to the network❌" });
  }
}

function deletePost(req, res) {
  try {
    const id = parseInt(req.params.id);

    //const post = posts.filter((p) => p.id !== id); -- wrong

    posts = posts.filter((p) => p.id !== id);

    // res.render("/posts/index"); -- wrong
    res.redirect("/posts");
  } catch (error) {
    res.status(500).json({ message: "Can't connect to the network❌" });
  }
}

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  deletePost,
  updatePost,
};
