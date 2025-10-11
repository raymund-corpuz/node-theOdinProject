/* IMPORT passport, LocalStrategy, userModel, bcrypt

DEFINE LocalStrategy(username, password, done)
  FIND user by username
  IF user NOT FOUND
    RETURN done(null, false, message: "Incorrect Username")
  COMPARE password with user.password using bcrypt
  IF passwords DON'T MATCH
    RETURN done(null, false, message: "Incorrect Password")
  RETURN done(null, user)

passport.serializeUser(user, done)
  SAVE user.id in session

passport.deserializeUser(id, done)
  FIND user by id
  RETURN done(null, user)

EXPORT passport
 */
/*const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await userModel.finduserByUsername(username);
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
    const user = await userModel.findUserById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;*/

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await userModel.finduserByUsername(username);

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
    const user = await userModel.findUserById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
