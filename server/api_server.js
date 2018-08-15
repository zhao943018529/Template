const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const https = require("https");
const app = express();


const db = require('../db');
const user=require('./Api/user');

const category = require('./Api/category');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());
app.use(cookieParser("express-cookie"));
app.use(session({
    secret: 'express-cookie',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 1000 * 30
    },
}));

app.use('/category',category);
app.use(user);

app.get('/v2/movie/in_theaters',function(request,response){
    let data='';
    let req = https.request('https://api.douban.com/v2/movie/in_theaters',res=>{   
        res.on('data',chunk=>{
            data+=chunk;
        });
        res.on('end',()=>{
            response.setHeader('Content-Type', 'application/json');
            response.end(data);
        });
    });
    req.end();
});

app.listen(13893, err => {
    if (err) {
        console.log("start server port 13893 failed");
    } else {
        console.log("server port:" + 13893);
    }
});