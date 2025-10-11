const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await userModel.getUserByUsername(username);
      if (!user) return done(null, false, { message: "Incorrect Username" });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) return done(null, false, { message: "Incorrect Password" });

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.getUserById(id);
    done(null, user);
  } catch (error) {
    return done(error);
  }
});

module.exports = passport;
