const mongoose = require('mongoose');
const bcrypt=  require('bcryptjs');
const jwt =require('jsonwebtoken');

const User= require('../models/user');
const blog= require('../models/blog');

const HttpError = require('../utils/http-error');

const userSignup =  async (req,res,next) => {
    console.log(req.body);
    
    const{ firstname, lastname, email, password, dob, role} =req.body;

    let existingUser;
    try{
       existingUser= await User.findOne({email:email,});
    }catch(err){
        const error  = new HttpError("Signup Failed, Please try again later", 501);
        return next(error);
    }

    if(existingUser){
        const error  = new HttpError("User already exist ", 502);
        return next(error);
    }

    let hashedPassword;
    try{
        hashedPassword= await bcrypt.hash(password, 12);
    }catch(err){
        const error  = new HttpError("Password encryption failed ", 503);
        return next(error);
    }
    
    const createdUser= new User({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hashedPassword,
        dob: dob,
        role: 'User',
    });
    
    try {
        await createdUser.save();
        res.json({'mesaage':"user signed up"});
      } catch (err) {
        console.log(err);
        const error = new HttpError("Signup failed", 500);
        return next(error);
      }
      let token;
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
        
      },
      "userSecretKey",
      { expiresIn: "2h" }
    );

    // console.log(token);
  } catch (err) {
    const error = new HttpError("Login Failed, Please try later", 403);
    return next(error);
  }

  return res.json({userId: createdUser.id, email: createdUser.email, token: token});

};

 

const userLogin = async (req,res,next) => {
    const {email,password}= req.body;
    let existingUser;
    try{
        existingUser= await User.findOne({email:email});
    }catch(err){
        const error  = new HttpError("Login Failed, Please try again later", 507);
        return next(error);
    }
    
    if(!existingUser){
        const error  = new HttpError("Invalid Credentials, please try again later!", 403);
        return next(error);
    }

    let isValidpassword=false;
    try{
        isValidpassword= await bcrypt.compare(password, existingUser.password);
    }catch(err){
        const error  = new HttpError("Invalid Credentials, please try again later!", 403);
        return next(error);
    }
    if(!isValidpassword){
        const error  = new HttpError("Invalid Credentials, please try again later!", 403);
        return next(error);
    }

    let token;
    try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
      },
      "userSecretKey",
      { expiresIn: "2h" }
    );}catch(err){
      const error  = new HttpError("Invalid token, login failed", 405);
        return next(error);
    }

    res.status(200).json({
        firstname: existingUser.firstname,
        lastname: existingUser.lastname,
        email : existingUser.email,
        dob: existingUser.dob,
        token :token
    });
};

const userGetInfo =(req,res,next) => {
    console.log(req.query);
    console.log(req.params);
    res.json({
      user: {
        name: "himanshi",
        age: 20,
      },
    })
}

const postblog = (req, res, next) =>{
    
  return res.json({
    "message": `Post created by user ${req.user.email}`
  });
    
}


const getblog = (req, res, next) =>{
    
  return res.json({
    "message": `get blog by user ${req.user.email}`
  });
    
}
exports.userSignup = userSignup;
exports.userLogin = userLogin;
exports.userInfo = userGetInfo;
 exports.postBlog= postblog;
 exports.getBlog= getblog;
