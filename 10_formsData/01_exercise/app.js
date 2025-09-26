// const express = require("express");
// const { validationResult } = require("express-validator");
// const path = require("path");

// const app = express();

// const PORT = process.env.PORT || 8080;

// app.use(express.urlencoded({ extended: true }));

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// app.get("/", (req, res) => {
//   res.render("index", { errors: null, oldInput: {} });
// });

// app.post(
//   "/submit",
//   [
//     body("username")
//       .trim()
//       .isAlpha()
//       .withMessage("Username must only contain letters")
//       .isLength({ min: 3, max: 15 })
//       .withMessage("Username must be 3-15 characters."),

//     body("email")
//       .trim()
//       .isEmail()
//       .withMessage("Must be a valid email address")
//       .normalizeEmail(),
//   ],
//   (req, res) => {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//       return res.status(400).render("index", {
//         errors: errors.array(),
//         oldInput: req.body,
//       });
//     }

//     const { username, email } = req.body;
//     res.render("sucess", { username, email });
//   }
// );

// app.listen(PORT, () => {
//   console.log(`🚀 Server is running at http://localhost:${PORT}`);
// });

// app.js
const express = require("express");
const path = require("path");
const { body, validationResult } = require("express-validator");

const app = express();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Setup EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// GET form page
app.get("/", (req, res) => {
  res.render("index", { errors: null, oldInput: {} });
});

// POST form with validation
app.post(
  "/submit",
  [
    body("username")
      .trim()
      .isAlpha()
      .withMessage("Username must only contain letters.")
      .isLength({ min: 3, max: 15 })
      .withMessage("Username must be 3–15 characters."),
    body("email")
      .trim()
      .isEmail()
      .withMessage("Must be a valid email address.")
      .normalizeEmail(),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Re-render form with errors + previous input
      return res.status(400).render("index", {
        errors: errors.array(),
        oldInput: req.body,
      });
    }

    // On success, show sanitized data
    const { username, email } = req.body;
    res.render("success", { username, email });
  }
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
