const express = require("express");
const app = express();
const authorRouter = require("./routes/authorRouter");

const PORT = process.env.PORT || 3000;

app.use("/authors", authorRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server is Running at http://localhost:${PORT}`);
});
