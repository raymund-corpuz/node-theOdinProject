const express = require("express");
const postControllers = require("../controllers/postControllers");
const { post } = require("./authRoutes");

const router = express.Router();

//Simple middlewate to protect routes
function ensureAuthenticated(req, res, next) {
  if (req.session.user && req.session.id) {
    return next();
  }
  return res.redirect("/auth/login");
}

router.get("/create", ensureAuthenticated, postControllers.showCreateForm);

router.post(
  "/create",
  ensureAuthenticated,
  postControllers.postValidation,
  postControllers.createPost
);

module.exports = router;
