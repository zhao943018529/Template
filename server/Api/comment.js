const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Article = mongoose.model('Article');
const Comment = mongoose.model('Comment');

router.post('/add', function (req, res, next) {
    let comment = new Comment(req.body);
    comment.save(function (err, comment) {
        if (err) {
            if (err.errors) {
                res.json({
                    status: 300,
                    data: err.errors,
                    message: 'validate failed',
                });
            } else {
                next(err);
            }
        } else {
            res.json({
                status: 200,
                message: 'add comment successfully',
            });
        }
    });
});

router.get('/getCommentsByAId/:id', function (req, res, next) {
    let aid = req.params.id;
    Comment.findTopComments(aid, function (err, comments) {
        if (err) {
            next(err);
        } else {
            res.json({
                status: 200,
                data: comments,
                message: 'fetch comments successfully',
            });
        }
    });
});

router.get('/getCommentsByPId/:id', function (req, res, next) {
    let pid = req.params.id;
    Comment.findCommentsByPid(pid, function (err, comments) {
        if (err) {
            next(err);
        } else {
            res.json({
                status: 200,
                data: comments,
                message: 'fetch comments successfully',
            });
        }
    });
});

module.exports = router;