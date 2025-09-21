const express = require("express");

const app = express();
const PORT = 3000;

const authorRouter = require("./routes/v1-authorRouter");

app.use("/authors", authorRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
