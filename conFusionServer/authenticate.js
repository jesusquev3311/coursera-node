const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

const config = require('config');


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToke = (user)=>{
    return jwt.sign(user, config.secrectKey, {expiresIn: 3600})
};

let opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts._secretOrKey = config.secrectKey;

exports.jwtPassport = passport.use(new jwtStrategy(opts), (jwt_payload, done)=>{
    cosole.log("JWT payload: ", jwt_payload);
    User.findOne({id: jwt_payload.sub}, (err,user) =>{
       if( err) {
           return done(err, false);
       }
       else if (user) {
           return done(null, user);
       }
       else {
          return done(null, false);
        }
    });
});

exports.verifyUser = passport.authenticate('jwt', {session: false});
