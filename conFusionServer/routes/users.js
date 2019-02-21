const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport');
let User = require('../models/user');

router.use(bodyParser.json());
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
//user signup
router.post('/signup', (req, res, next) => {
    User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
        if (err) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'aplication/json');
            res.js({err: err});
        } else {
            passport.authenticate('local')(req, res, () => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'aplication/json');
                res.json({success: true, status:'Registration successful'})
            });
        }
    })
});

//user login
router.post('/login', passport.authenticate('local'),(req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'aplication/json');
    res.json({success: true, status:'You\'re successfully logged in'})
});

//user logout
router.get('/logout', (req, res, next) => {
    if (req.session) {
        req.session.destroy();
        res.clearCookie('session-id');
        res.redirect('/');
    } else {
        let err = new Error('You are not login');
        err.status = 403;
        next(err);
    }
});


module.exports = router;
