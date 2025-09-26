const express = require("express");
const { body, validationResult } = require("express-validator");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const userValidationRules = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be atleast 3 characters long"),

  body("email").trim().notEmpty().withMessage("Invalid email address"),
];

app.get("/", (req, res) => {
  res.render("index", { errors: null, oldInput: {} });
});

app.post("/submit", userValidationRules, (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("index", {
      errors: errors.array(),
      oldInput: req.body,
    });
  }

  const { username, email } = req.body;

  res.render("success", { username, email });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
