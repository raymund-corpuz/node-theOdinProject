const { body, validationResult } = require("express-validator");
const PostStorage = require("../models/PostStorage");
const UserStorage = require("../models/UserStorage");

//postValidation
const postValidation = [
  body("title")
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Title 3-100 characters"),
  body("body").trim().isLength({ min: 1 }).withMessage("Body is required"),
];

//List post (home page)
function listPost(req, res) {
  const posts = PostStorage.getAllPost();

  //Attach author username for each post for rendering.
  const postsWithAuthor = posts.map((p) => {
    const author = UserStorage.findById(p.authorId);
    return { ...p, authorName: author ? author.username : "Unknown" };
  });

  res.render("index", { title: "Blog", posts: postsWithAuthor });
}

//show create post form
function showCreateForm(req, res) {
  res.render("createPost", {
    title: "Create Post",
    errors: null,
    oldInput: {},
  });
}

//handle create post
function createPost(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("createPost", {
      title: "Create Post",
      errors: errors.array(),
      oldInput: req.body,
    });
  }

  const authorId = req.session.user.id;
  const { title, body: content } = req.body;

  PostStorage.addPost({
    authorId,
    title,
    body: content,
    createdAt: new Date(),
  });
  res.redirect("/");
}

module.exports = {
  listPost,
  showCreateForm,
  createPost,
  postValidation,
};
