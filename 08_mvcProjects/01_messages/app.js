const express = require("express");
const app = express();

const messageRoutes = require("./routes/messageRoute");

const PORT = process.env.PORT || 8080;

app.set("view engine", "ejs");

app.use("/messages", messageRoutes);

app.use("/", (req, res) => {
  res.redirect("/messages");
});

// app.use("/message", getAllMessages);
// app.use("/message, getMessageById");

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
