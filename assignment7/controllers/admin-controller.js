const mongoose = require('mongoose');
const User= require('../models/admin');

const HttpError = require('../utils/http-error');

const adminSignup = (req,res,next) => {
    console.log(req.body);

     res.status(200).json({'message': 'Admin signed up'});

}

const adminLogin = (req,res,next) => {
    console.log(req.body);

    
    res.status(200).json({'message': 'Admin logged in'});
}



exports.adminSignup = adminSignup;
exports.adminLogin = adminLogin;
