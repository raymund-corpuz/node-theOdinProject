// require("dotenv").config();
// const express = require("express");
// const session = require("express-session");
// const passport = require("passport");
// const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

// const app = express();

// //middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// //session setup
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     store: new PrismaSessionStore(prisma, { checkPeriod: 2 * 60 * 1000 }),
//   })
// );

// //passport session
// app.use(passport.initialize());
// app.use(passport.session());

// //Routes
// app.get("/", (req, res) => res.send("Welcome to File Uploader "));

// module.exports = app;

// =========== Re-Create ================== //
require("dotenv").config(); // correct
const path = require("path");
const express = require("express"); //c
const session = require("express-session"); //c
const passport = require("passport"); //c
const { PrismaSessionStore } = require("@quixo3/prisma-session-store"); //c
const { PrismaClient } = require("@prisma/client"); //c
const prisma = new PrismaClient(); //C
const uploadRoutes = require("./routes/uploadRoutes");
const expressLayouts = require("express-ejs-layouts");

const app = express(); //c

//ejs
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layout");

//middleware
app.use(express.json()); //c
app.use(express.urlencoded({ extended: true })); //c
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false, // ✅ fix the warning too
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, // every 2 minutes
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    },
  })
);

//passport
app.use(passport.initialize()); //c
app.use(passport.session()); //c
app.use("/api", uploadRoutes);

//Routes
// app.get("/", (req, res) => {
//   res.send("Welcome to the File uploader");
// });
app.get("/", uploadRoutes);

module.exports = app;
