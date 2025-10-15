require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();

//MiddleWare
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(prisma, { checkPeriod: 2 * 60 * 1000 }),
  })
);

//Passport setup
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.get("/", (req, res) => {
  res.send("Welcome to the File Uploader API");
});

module.exports = app;
