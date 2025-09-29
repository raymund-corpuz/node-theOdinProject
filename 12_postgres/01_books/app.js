const express = require("express");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", bookRoutes);
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
