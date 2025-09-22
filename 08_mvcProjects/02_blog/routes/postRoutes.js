const express = require("express");
const postController = require("../controllers/postController");

const router = express.Router();

router.get("/", postController.getAllPost);
router.get("/:id", postController.getPostById);
router.post("/", postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

module.exports = router;
