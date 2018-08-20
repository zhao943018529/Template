const mongoose =require('mongoose');

mongoose.connect('mongodb://localhost:27017/myblog',{
	useNewUrlParser: true,
	reconnectTries:30,
	reconnectInterval:500,
}).then(()=>{
	console.log('connect database successfully');
},err=>{
	console.error('Error in MongoDb connection: ' + error);
});
mongoose.Promise = global.Promise;

// let db = ;

// db.once('open', () => {
// 	console.log('connect database successfully');
// });


// db.on('error', (err) => {
// 	console.error('Error in MongoDb connection: ' + error);
// 	mongoose.disconnect();
// });


// db.on('close', () => {
// 	console.log('数据库断开，重新连接数据库');
// 	mongoose.connect('mongodb://localhost/test');
// });


module.exports = mongoose.connection;