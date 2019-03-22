const bcrypt = require('bcryptjs');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const express = require('express');
const app = express();

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'passwd'
  },
  function(username, password, done) {
  }
  
));

app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    res.redirect('/index' + req.user.username);
  });

passport.use(new localStrategy(function(email, password, done){
    const admin =  Admin.findOne({email: email});
    const investor =  Investor.findOne({email : email});
    const lawyer =   Lawyer.findOne({email : email});
    const reviewer =  Reviewer.findOne({email : email});
    if(err) {return done(err);}
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    if(admin)
    {
        const passFromDB = admin.password;
        const passFromDBHash = bcrypt.hashSync(passFromDB);
        if(passFromDBHash === hashedPassword)
            return done(null, admin);
        else
            return done(null, false, { message: 'Incorrect password.' })
    }
    if(investor)
    {
        const passFromDB = investor.password;
        const passFromDBHash = bcrypt.hashSync(passFromDB);
        if(passFromDBHash === hashedPassword)
            return done(null, investor);
        else
            return done(null, false, { message: 'Incorrect password.' })
    }
    if(lawyer)
    {
        const passFromDB = lawyer.password;
        const passFromDBHash = bcrypt.hashSync(passFromDB);
        if(passFromDBHash === hashedPassword)
            return done(null, lawyer);
        else
            return done(null, false, { message: 'Incorrect password.' })
    }
    if(reviewer)
    {
        const passFromDB = reviewer.password;
        const passFromDBHash = bcrypt.hashSync(passFromDB);
        if(passFromDBHash === hashedPassword)
            return done(null, reviewer);
        else
            return done(null, false, { message: 'Incorrect password.' })
    }
    })
);

module.exports = app;