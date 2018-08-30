const mongoose = require('mongoose');
const Article = mongoose.model('Article');
const Schema = mongoose.Schema;
const CommentSchema = new Schema({
    aid: {
        type: Schema.Types.ObjectId,
    },
    pid: {
        type: Schema.Types.ObjectId,
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    body: {
        type: String,
        required: true,
    },
    responseTo: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    updateAt: {
        type: Date,
        default: Date.now,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
});

CommentSchema.virtual("id").get(function () {
    return this._id;
});

CommentSchema.set("toJSON", { virtuals: true });

CommentSchema.post('save', function (comment) {
    if (comment.aid) {
        Article.findByIdAndUpdate(comment.aid, {
            $push: { tags: comment._id }
        });
    }
});

CommentSchema.statics.findTopComments = function (aid, cb) {
    return this.find({ aid: aid }).populate({
        path: 'author',
        select: '_id nickname username',
    }).sort('createAt').exec(cb);
}

CommentSchema.statics.findCommentsByPid = function (pid, cb) {
    return this.find({ pid: pid }).populate({
        path: 'author',
        select: '_id nickname username',
    }).populate({
        path: 'responseTo',
        select: '_id nickname username',
    }).sort('createAt').exec(cb);
}

module.exports = mongoose.model('Comment', CommentSchema);