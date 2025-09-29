const express = require("express");
const path = require("path");
const session = require("express-session");

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const postControllers = require("./controllers/postControllers");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "dev-secret-key-change-me",
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  next();
});

//views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//routes
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

//home page -> list posts
app.get("/", postControllers.listPost);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
