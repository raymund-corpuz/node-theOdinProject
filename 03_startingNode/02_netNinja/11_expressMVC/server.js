const express = require("express");
const itemRoutes = require("./routes/itemRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/items", itemRoutes);

app.listen(PORT, (req, res) => {
  console.log(`Server is Running http://localhost:${PORT}`);
});
