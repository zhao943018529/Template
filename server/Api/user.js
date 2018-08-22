const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');

router.post('/login', function (req, res, next) {
    let body = req.body;
    console.log(body);
    User.getUserByUsernameAndPassword(body.username, body.password, function (err, user) {
        let result = {};
        if (err) {
            console.log(err);
            next(err);
        } else {
            if (user) {
                req.session.uid = user.id;
                result.status = 200;
                result.data = user;
                result.message = "Login successfully";
            } else {
                result.status = 100;
                result.message = "username or password incorrect";
            }
            res.json(result);
        }
    });
});

router.post('/register', function (req, res, next) {
    let user = new User(req.body);
    user.save(function (err, user) {
        let result = {};
        if (err) {
            if (err.errors) {
                console.log(err);
                result.status = 300;
                result.data = err.errors;
                result.message = 'validate failed';
            } else {
                next(err);
            }
        } else {
            result.status = 200;
            result.data = user;
            result.message = 'successful';
        }
        res.json(result);
    });
});

router.get('/valiUsername', function (req, res, next) {
    let username = req.query.username;
    if (username) {
        User.usernameIsExists(username, function (err, isExists) {
            let result = {};
            if (err) {
                next(err);
            } else {
                result.status = 200;
                result.data = { used: isExists };
                result.message = isExists ? 'already used' : 'ok';
            }
            res.json(result);
        });
    } else {
        res.json({
            status: 100,
            message: 'illegal access',
        });
    }
});

router.get('/getLoginUser', function (req, res) {
    let result = {};
    if (req.user) {
        result.status = 200;
        result.data = req.user;
    } else {
        result.status = 100;
        result.message = "Not Login";
    }

    res.json(result);
});

module.exports = router;