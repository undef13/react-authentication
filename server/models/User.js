const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    min: 4,
    max: 15,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 15
  },
  givenName: {
    type: String,
    required: true
  },
  familyName: {
    type: String,
    required: true
  },
  registrationDate: {
    type: Date,
    default: new Date()
  }
});

UserSchema.pre("save", function(next) {
  if(!this.isModified("password"))
    return next();
  bcrypt.hash(this.password, 10, (error, passwordHash) => {
    if(error)
      return next(error);
    this.password = passwordHash;
    next();
  });
});

UserSchema.methods.comparePasswords = function(password, done) {
  bcrypt.compare(password, this.password, (error, isMatch) => {
    if(error)
      return done(error);
    if(!isMatch) {
      return done(null, isMatch)
    }
    return done(null, this);
  });
}

module.exports = User = mongoose.model("users", UserSchema);