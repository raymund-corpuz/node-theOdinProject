const express = require("express"); //correct
const postRoute = require("./routes/postRoutes"); //correct
const app = express(); //correct

const PORT = process.env.PORT || 8080; //correct

app.use(express.urlencoded({ extended: true })); //to parse form data

app.set("view engine", "ejs"); //correct

app.use("/posts", postRoute); //correct

app.use("/", (req, res) => {
  //correct
  res.redirect("/posts");
});

app.listen(PORT, () => {
  // correct
  console.log(`🚀 Server is Running at http://localhost:${PORT}`);
});
