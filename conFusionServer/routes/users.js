const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
let User = require('../models/user');

router.use(bodyParser.json());
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
//user signup
router.post('/signup', (req, res, next) => {
    User.findOne({username: req.body.username})
        .then((user) => {
            if (user != null) {
                var err = new Error(`User ${req.body.username} Already Exist`);
                err.status = 403;
                next(err);
            } else {
                return User.create({
                    username: req.body.username,
                    password: req.body.password
                });
            }
        })
        .then((user) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'aplication/json');
            res.status(200).json({
                user: user,
            }, (err) => next(err))
        })
        .catch((err) => next(err));
});

//user login
router.post('/login', (req, res, next) => {
    if (!req.session.user) {
        var authHeader = req.headers.authorization;
        if (!authHeader) {
            var err = new Error('You are not authenticated!');
            res.setHeader('WWW-Authenticate', 'Basic');
            err.status = 401;
            next(err);
            return;
        }

        let auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
        let username = auth[0];
        let password = auth[1];
        User.findOne({username: username}).then((user) => {
            if (user === null) {
                let err = new Error(`User: ${username} doesn't exist`);
                res.setHeader('WWW-Authenticate', 'Basic');
                err.status = 401;
                next(err);
            } else if (user.password !== password) {
                let err = new Error('Your Password is incorrect');
                res.setHeader('WWW-Authenticate', 'Basic');
                err.status = 401;
                next(err);
            } else if (user.username === username && user.password === password) {
                req.session.user = 'authenticated';
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain');
                res.end('You\'re authenticated');
                return next(err);
            } else {
                let err = new Error('You are not authenticated!');
                res.setHeader('WWW-Authenticate', 'Basic');
                err.status = 401;
                next(err);
            }
        }).catch((err) => next(err));

    } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('You are already aauthenticated');
    }
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
