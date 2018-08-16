const express = require('express');
const router = express.Router();

const User = require('../../models/User');

router.post('/register',function(req,res){
    let user = new User(req.body);
    user.save(function(err){
        let result={};
        if(err){
            console.log(err);
            result.status=500;
            result.error=err.errors;
            result.message='validate failed';
        }else{
            result.status=200;
            result.message='successful';
        }
        res.json(result);
    });
});

router.get('/valiUsername',function(req,res){
    let username = req.body.username;
    if(username){
        User.usernameIsExists(username,function(err,isExists){
            let result ={};
            if(err){
                result.status=500;
                result.message='server error';
            }else{
                result.status=200;
                result.data={used:isExists};
                result.message=isExists?'already used':'ok';
            }
            res.json(result);
        });
    }else{
        res.json({
            status:444,
            message:'illegal access',
        });
    }
});

module.exports=router;