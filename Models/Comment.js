const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CommentSchema = new Schema({
    aid: {
        type: Schema.Types.ObjectId,
    },
    pid: {
        type: Schema.Types.ObjectId,
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

module.exports = mongoose.model('Comment', CommentSchema);