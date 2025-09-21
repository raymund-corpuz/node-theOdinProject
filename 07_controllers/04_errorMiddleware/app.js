const express = require("express");
const app = express();

const PORT = 8080;

const { crashController } = require("./controllers/crashControllers");

app.get("/", (req, res) => {
  res.send("Home Page OK✅");
});

app.get("/crash", crashController);

// ========== Error Handling middleware ======

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: "Internal Server Error",
    error: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`✅Server is Running at http://localhost:${PORT}`);
});
