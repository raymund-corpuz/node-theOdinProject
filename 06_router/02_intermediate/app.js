const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

//Route 1: GET/
app.get("/", (req, res) => {
  res.send("Welcome to my site");
});

//Route 2: GET /about
app.get("/about", (req, res) => {
  res.send("This is the about page");
});

//Route 3: POST /contact
app.post("/contact", (req, res) => {
  res.send("Form is Submmitted");
});

//Route 4: GET /users/:id (Route parameter)
app.get("/users/:id", (req, res) => {
  console.log("Params:", req.params);
  res.send(`User Id: ${req.params.id}`);
});

//Route 5: GET /search (Query parameters)
app.get("/search", (req, res) => {
  console.log("Query: ", req.query);
  const { term, sort } = req.query;

  res.send(`Search term: ${term}, Sort: ${sort}`);
});

app.listen(PORT, () => {
  console.log(`🚀 Server is Running at http://localhost:${PORT}`);
});
