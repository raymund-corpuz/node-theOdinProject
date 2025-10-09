// const express = require("express");
// const path = require("path");
// const { Pool } = require("pg");
// const session = require("express-session");
// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;

// const pool = new Pool({
//   host: "localhost",
//   user: "postgres",
//   database: "testauth_db",
//   password: "111111",
//   port: 5432,
// });

// const app = express();

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// app.use(
//   session({
//     secret: "cats",
//     resave: false,
//     saveUninitialized: false,
//     cookie: { maxAge: 3600000 },
//   })
// );

// app.use(passport.session());
// app.use(express.urlencoded({ extended: false }));

// passport.use(
//   new LocalStrategy(async (username, password, done) => {
//     try {
//       const { rows } = await pool.query(
//         "SELECT * FROM users WHERE username = $1",
//         [username]
//       );
//       const user = rows[0];

//       if (!user) {
//         return done(null, false, { message: "Incorrect username" });
//       }
//       if (user.password !== password) {
//         return done(null, false, { message: "Incorrect password" });
//       }
//       return done(null, user);
//     } catch (err) {
//       return done(err);
//     }
//   })
// );

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const { rows } = await pool.query("SELECT * FROM users WHERE id =  $1", [
//       id,
//     ]);
//     const user = rows[0];

//     done(null, user);
//   } catch (error) {
//     done(error);
//   }
// });

// app.post("/sign-up", async (req, res, next) => {
//   try {
//     await pool.query("INSERT INTO users (username, password) VALUES ($1,$2)", [
//       req.body.username,
//       req.body.password,
//     ]);
//     res.redirect("/");
//   } catch (error) {
//     return next(error);
//   }
// });
// app.post(
//   "/log-in",
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/",
//   })
// );

// app.get("/", (req, res) => {
//   res.render("index");
// });

// app.get("/sign-up", (req, res) => {
//   res.render("sign-up-form");
// });
// app.get("/", (req, res) => {
//   res.render("index", { user: req.user });
// });

// app.get("/log-out", (req, res, next) => {
//   req.logout((err) => {
//     if (err) {
//       return next(err);
//     }
//     res.redirect("/");
//   });
// });

// app.use((req, res, next) => {
//   res.locals.currentUser = req.user;
//   next();
// });

// app.listen(3000, () => {
//   console.log(`🚀 Server is running at http://localhost:3000`);
// });

// ===================== Re - Create ==================== //
const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");

//Connect to Postgres
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  database: "testauth_db",
  password: "111111",
  port: 5432,
});

//Initialize Exprress
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "cats",
    resave: false,
    saveUninitialized: false,
  })
);

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Middleware to expose user globally in EJS
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

//Define Passport Local Strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE username =  $1",
        [username]
      );
      const user = rows[0];

      if (!user) return done(null, false, { message: "Incorrect username" });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return done(null, false, { message: "Incorrect password" });

      return done(null, user);
    } catch (error) {
      done(error);
    }
  })
);

//Serialize / Deserialize
passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    done(null, rows[0]);
  } catch (error) {
    done(error);
  }
});

//Routes
//Home Route
app.get("/", (req, res) => {
  res.render("index", { user: req.user });
});

//Sign up Form
app.get("/sign-up", (req, res) => {
  res.render("sign-up-form");
});

//Handle sign-up
app.post("/sign-up", async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await pool.query(
      "INSERT INTO users  (username, password) VALUES   ($1, $2)",
      [req.body.username, hashedPassword]
    );
    res.redirect("/");
  } catch (err) {}
});

//Handle Login
app.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

//handle logout
app.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

//Start server
app.listen(8080, () => {
  console.log(`✅ Server is runnint on http://localhost:8080`);
});
