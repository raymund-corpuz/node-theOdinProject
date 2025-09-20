const express = require("express");
const app = express();

//Import routers
const bookRouter = require("./routes/bookRouter");
const authorRouter = require("./routes/authorRouter");

app.use("/books", bookRouter);
app.use("/authors", authorRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my site with Routers!");
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
