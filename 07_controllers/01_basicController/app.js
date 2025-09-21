const express = require("express");

const app = express();

const PORT = process.env.PORT || 8080;

function getHello(req, res) {
  // res.send("Hello from Server1");

  res.json({ message: "Hello JSON" });
}

app.get("/hello", getHello);

app.listen(PORT, () => {
  console.log(`🚀 Server is Running at http://localhost:${PORT}`);
});
