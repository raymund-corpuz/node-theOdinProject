const express = require("express"); // ==== correct
const messageRoutes = require("./routes/messageRoutes"); // ==== correct
const app = express(); // ===== correct

const PORT = process.env.PORT || 8080; // ==== correct

app.set("view engine", "ejs"); // ==== correct

app.use("/messages", messageRoutes); // ======= correct

app.use("/", (req, res) => {
  res.redirect("/messages");
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
