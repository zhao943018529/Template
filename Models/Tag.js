const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    description:String,
},{ versionKey: false});

tagSchema.virtual('id').get(function(){
	return this._id;
});

tagSchema.set('toJSON', { virtuals: true });
tagSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Tag', tagSchema);