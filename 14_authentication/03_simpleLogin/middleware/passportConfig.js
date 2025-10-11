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
