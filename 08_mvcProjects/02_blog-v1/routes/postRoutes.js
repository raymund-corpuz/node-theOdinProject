const express = require("express");
const postControllers = require("../controllers/postControllers");
const { post } = require("../../01_messages-v1/routes/messageRoutes");
const router = express.Router();

router.get("/", postControllers.getAllPosts);
router.get("/:id", postControllers.getPostById);
router.post("/", postControllers.createPost);
router.put("/:id", postControllers.updatePost);
router.delete("/:id", postControllers.deletePost);

module.exports = router;
