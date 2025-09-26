const express = require("express");
const path = require("path");
const usersRouter = require("./routes/usersRouter");
const PORT = process.env.PORT || 8080;

// INITIALIZE express app
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//MOunt Router
app.use("/", usersRouter);

//App listen
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
