const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true,
        default: '007',
    },
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /\w{8,16}/.test(v);
            },
            message: '{VALUE} is not a valid username',
        }
    },
    phone: {
        type: Number,
    },
    email: {
        type: String,
        validate: function (v) {
            return validator.isEmail(v);
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /\w{6,16}/.test(v);
            },
            message: '{VALUE} is not a valid password',
        }
    },
    createDate: {
        type: Date,
        default: Date.now,
    },
});

UserSchema.virtual("id").get(function() {
  return this._id;
});

UserSchema.set("toJSON", { virtuals: true });

UserSchema.statics = {
	getUserByName: function(username, callback) {
		return this.findOne({
			username: username
		}, callback);
	},
	getUserById: function(_id, cb) {
		return this.findById(_id, cb);
    },
    usernameIsExists:function(username,cb){
        return this.findOne({username:username}).select('username',function(err,user){
            cb(err,!!user);
        });
    }
}

module.exports=mongoose.model('User',UserSchema);