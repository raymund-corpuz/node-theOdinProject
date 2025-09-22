const express = require("express"); // correct
const postController = require("../controllers/postController"); // correct

const router = express.Router(); //correct

router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);
router.post("/", postController.createPost);
// using POST instead of PUT (easier with forms)
router.put("/:id/update", postController.updatePost);
// using POST instead of DELETE (easier with forms)

router.delete("/:id/delete", postController.deletePost);
module.exports = router;
