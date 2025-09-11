// require("dotenv").config();

// const express = require("express");
// const mongoose = require("mongoose");
// const todoRoutes = require("./routes/todoRoutes ");

// const app = express();
// const PORT = process.env.PORT || 3000;

// //middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.set("view engine", "ejs");

// //Routes
// app.use("/", todoRoutes);

// //mongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ Connected to MONGODB");

//     app.listen(PORT, () => {
//       console.log(`Server is running at http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => console.error("❌ DB connection error:", err));

// require("dotenv").config();

// const express = require("express");
// const mongoose = require("mongoose");
// const todoRoutes = require("./routes/todoRoutes");

// const app = express();
// const PORT = process.env.PORT || 3000;

// //middleWare
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.set("view engine", "ejs");

// //routing
// app.use("/", todoRoutes);

// //mongo connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("Connected to MONGODB");
//     app.listen(PORT, () => {
//       console.log(`🚀 Server is running at http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => console.error("Error occured", err));

// require("dotenv").config();

// const express = require("express");
// const mongoose = require("mongoose");
// const todoRoutes = require("./routes/todoRoutes");

// const app = express();
// const PORT = process.env.PORT || 3000;

// //middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true })); //missing
// app.set("view engine", "ejs");

// //routes
// app.use("/", todoRoutes);

// //connect mongoDB
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log(`✅Connected to MongoDB`);
//     app.listen(PORT, () => {
//       console.log(`🚀Server is running at http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => console.log("❌Cant connect to MONGODB", err));

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todoRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//routes
app.use("/", todoRoutes);

//connect mongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server is running http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("❌Cant connect to MongoDB"));
