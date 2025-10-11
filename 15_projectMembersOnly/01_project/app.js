const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const userRoutes = require("./routes/userRoutes");

require("./middleware/passportConfig");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", userRoutes);

app.listen(8080, () => {
  console.log(`Server is running at http://localhost:8080`);
});
