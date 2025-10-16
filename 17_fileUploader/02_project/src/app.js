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
const express = require("express"); //c
const session = require("express-session"); //c
const passport = require("passport"); //c
const { PrismaSessionStore } = require("@quixo3/prisma-session-store"); //c
const { PrismaClient } = require("@prisma/client"); //c
const prisma = new PrismaClient(); //C

const app = express(); //c

//middleware
app.use(express.json()); //c
app.use(express.urlencoded({ extended: true })); //c

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

//Routes
app.get("/", (req, res) => {
  res.send("Welcome to the File uploader");
});

module.exports = app;
