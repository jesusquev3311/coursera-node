const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
let User = require('../models/user');

router.use(bodyParser.json());
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/signup', (req, res, next) => {
    User.findOne({username: req.body.username})
        .then((user) => {
            if (user != null) {
                var err = new Error(`User ${req.body.username} Already Exist`);
                err.status(403);
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
            res.json({
                status: 'registration successful!',
                user: user,
            }, (err) => next(err))
        })
        .catch((err) => next(err));
})

module.exports = router;
