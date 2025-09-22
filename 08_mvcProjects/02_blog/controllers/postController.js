// ==== const express = require("express"); // remove
/* 
let posts = require("../models/Post");

function getAllPosts(req, res) {
  // ==== res.render("index", { posts }); //-wrong
  res.render("posts/index", { posts });
}

function getPostById(req, res) {
  const id = parseInt(req.params.id); // correct
  const post = posts.find((p) => p.id === id); // correct

  if (!post) return res.status(404).json({ message: "Post Not Found" }); //correct

  // ==== res.render("show", { post }); // wrong
  res.render("posts/show", { post }); // correct
}

function createPost(req, res) {
  const { title, content, author } = req.body; //correct

  if (!title || !content || !author)
    return res.status(404).json({ message: "Post Not Found" });

  const newPost = {
    // ==== id: posts.length > 0 ? posts.length[posts.length - 1].id + 1 : 1, // wrong
    id: posts.length ? posts[posts.length - 1].id + 1 : 1, // correct
    title,
    content,
    author,
  };

  posts.push(newPost); // correct

  res.redirect("/posts"); // correct
}

function updatePost(req, res) {
  const id = parseInt(req.params.id); //correct
  const post = posts.find((p) => p.id === id); // correct
  const { title, content, author } = req.body; // correct

  if (!post) return res.status(404).json({ message: "Post Not Found" }); //correct

  if (title) post.title = title;
  if (content) post.content = content;
  if (author) post.author = author;

  // ====  res.redirect("/posts/:id"); //wrong

  res.redirect(`/posts/${id}`); //correct
}

function deletePost(req, res) {
  const id = parseInt(req.params.id); //correct
  // ==== const post = posts.findIndex((p) => p.id === id); // wrong

  posts = posts.filter((p) => p.id === id);

  // ==== if (!post) return res.status(404).json({ message: "Post Not Found" });

  // ==== const deleteId = posts.splice(post, 1);   wrong
  res.redirect("/posts");
}

// missing
module.exports = {
  getAllPosts,
  getPostById,
  updatePost,
  createPost,
  deletePost,
};
 
*/

// controllers/postController.js
let posts = require("../models/Post");

const getAllPosts = (req, res) => {
  res.render("posts/index", { posts });
};

const getPostById = (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return res.status(404).send("Post not found");
  }

  res.render("posts/show", { post });
};

const createPost = (req, res) => {
  const { title, content, author } = req.body;
  const newPost = {
    id: posts.length ? posts[posts.length - 1].id + 1 : 1,
    title,
    content,
    author,
  };
  posts.push(newPost);
  res.redirect("/posts");
};

const updatePost = (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return res.status(404).send("Post not found");
  }

  const { title, content, author } = req.body;
  post.title = title || post.title;
  post.content = content || post.content;
  post.author = author || post.author;

  res.redirect(`/posts/${id}`);
};

const deletePost = (req, res) => {
  const id = parseInt(req.params.id);
  posts = posts.filter((p) => p.id !== id);
  res.redirect("/posts");
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
