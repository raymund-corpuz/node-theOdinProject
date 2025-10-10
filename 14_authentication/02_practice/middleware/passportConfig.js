const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

// define new LocalStrategy with username/password
function configurePassport(passport) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        // -> find user by username
        // const user = await userModel.findUserByUsername({ username: username });  // ==== wrong ======= //
        const user = await userModel.findUserByUsername(username);

        if (!user) {
          return done(null, false, { message: "Incorrect Username" });
        }
        // -> compare passwords using bcrypt
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return done(null, false, { message: "Incorrect Password" });
        }

        return done(null, user); //missing
      } catch (error) {
        // -> call done() accordingly
        return done(error);
      }
    })
  );

  // serializeUser(user) => save user.id
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
}

// deserializeUser(id) => find user by id // WRONG ======
// passport.deserializeUser((id, done) => {
//   userModel.findUserById(id, (err, user) => {
//     if (err) {
//       return done(err);
//     }
//     done(null, user);
//   });
// });

// deserializeUser(id) => find user by id // CORRECT =====
passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findUserById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// export configured passport
module.exports = configurePassport;
