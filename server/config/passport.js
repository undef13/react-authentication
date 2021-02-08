const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const User = require("../models/User");

const cookieExtractor = req => {
  let token = null;
  if(req && req.cookies) {
    token = req.cookies["access_token"];
  }
  return token;
}

const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: "My lovely bird"
}

passport.use(new JwtStrategy(opts, async (payload, done) => {
  try {
    const user = await User.findById({ _id: payload.sub });
    if(!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    console.error(error);
  }
}));

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username });
    if(!user)
      return done(null, false);
    user.comparePasswords(password, done);
  } catch (error) {
    console.error(error);
  }
}));