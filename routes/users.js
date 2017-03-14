const express= require('express');
const router =express.Router();
const passport =require('passport');
const jwt = require('jsonwebtoken');
const mongoose =require('mongoose');
const config = require('../config/database');
mongoose.Promise = Promise;


const User=require('../models/users');

// Register
router.post('/register', function(req,res,next){
    var newUser = new User({
        name: req.body.name,
        email:req.body.email,
        username:req.body.username,
        password: req.body.password,
        usertype: req.body.usertype,
        userrole:req.body.userrole
    });

    User.addUser(newUser,function(err,user){
        if (err){
            res.json({success:false, msg:'Faild to register user'});
        }else{
            res.json({success:true, msg:'User Registerd Success'});
        }
    });
    //TODO editUser
    User.editUser();
    //TODO updateUser
    User.updateUser();
    //TODO blockUser
    User.blockUser();
    //TODO deleteUser
    User.deleteUser();
});

// Authenticate
router.post('/authenticate', function(req,res,next){
    const email = req.body.email;

    const password =req.body.password;

    User.getUserByEmail(email,function(err,user){
       if (err) throw err;

       if (!user){

           return res.json({success:false, msg: 'User not found'});
       }else{

           User.comparePassword(password,user.password,function(err,isMatch){
               if (err) throw err;
               if(isMatch){
                   const token= jwt.sign(user, config.secret, {
                      expiresIn: 604800 //1 week
                   });
                       res.json({
                            success: true,
                            token:"JWT "+ token,
                       user:{
                                id:user._id,
                                name: user.name,
                                username: user.username,
                                email:user.email,
                                usertype:user.usertype,
                                userrole:user.userrole
                       }
                   });
               } else{
                   return res.json({success:false , msg:'wrong password'});
               }
           });
       }
    });
});

// Profile
router.get('/profile', passport.authenticate('jwt',{session:false}), function(req,res,next){
    res.json({user: req.user});
});

// Guest
router.get('/guest', function(req,res,next){
    res.send('GUEST');
});

// Staff
router.get('/staff', function(req,res,next){
    res.send('STAFF');
});

// Formers
router.get('/formers', function(req,res,next){
    res.send('FORMERS');
});

// Public Representatives
router.get('/pr', function(req,res,next){
    res.send('Public Representatives');
});
// Vendors
router.get('/vendors', function(req,res,next){
    res.send('VENDORS');
});

// System ADMIN Routes

// ssa Super Super Admin
router.get('/ssa', function(req,res,next){
    res.send('SUPER ADMIN');
});

// Country Admin
router.get('/ca', function(req,res,next){
    res.send('Country Admin');
});
// State Admin
router.get('/sa', function(req,res,next){
    res.send('State Admin');
});
// District Admin
router.get('/da', function(req,res,next){
    res.send('District Admin');
});
// Taluk Admin
router.get('/ta', function(req,res,next){
    res.send('Taluk Admin');
});

// Village Admin
router.get('/va', function(req,res,next){
    res.send('Village Admin');
});
// Establishment Admin
router.get('/ea', function(req,res,next){
    res.send('Establishment Admin');
});
// Ward Admin
router.get('/wa', function(req,res,next){
    res.send('Ward Admin');
});

// Data Entry Operator
router.get('/deo', function(req,res,next){
    res.send('Data Entry Operator');
});


module.exports =router;
