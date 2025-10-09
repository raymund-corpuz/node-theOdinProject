const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

// define new LocalStrategy with username/password
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // -> find user by username
      const user = await userModel.findUserByUsername({ username: username });

      if (!user) {
        return done(null, false, { message: "Incorrect Username" });
      }
      // -> compare passwords using bcrypt
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return done(null, false, { message: "Incorrect Password" });
      }
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
// deserializeUser(id) => find user by id
passport.deserializeUser((id, done) => {
  userModel.findUserById(id, (err, user) => {
    if (err) {
      return done(err);
    }
    done(null, user);
  });
});
// export configured passport

module.exports = passport;
