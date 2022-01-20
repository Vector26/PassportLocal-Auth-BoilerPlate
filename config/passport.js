const passport = require('passport');
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const LocalStrategy = require('passport-local').Strategy;
const {validPassword}= require('../lib/passwordUtils');
const connection = require('./database');
const User = connection.models.User;

const customFields={
    usernameField:"uname",
    passwordField:"pw"
}

const verifyCallback = function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!validPassword(password,user.hash,user.salt)) { return done(null, false); }
      return done(null, user);
    });
  }

const Strategy= new LocalStrategy(customFields,verifyCallback);

passport.use(Strategy);

const signToken = (id) => {
    return jwt.sign({ id: id }, process.env.secretKey, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  };

passport.serializeUser((user,done)=>{
    const token=signToken(user.id)
    done(null,token);
})

passport.deserializeUser(async (token,done)=>{
    const user = await promisify(jwt.verify)(token, process.env.secretKey);
    console.log(user);
    User.findById(user['id'])
        .then((user)=>{
            done(null,user)
        })
        .catch((err)=>{
            done(err)
        })
})