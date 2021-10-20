const User = require('../Models/userModel');
const client = require('twilio')("AC98980efd829b8762ab909275ce10846d","0329da8a7dade1c0df261b16a2a73174");
const AppError = require("../Utils/app.Error");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const io = require('../socket');

exports.getToken = async(req, res, next) => {
   const phonenumber = req.body.phonenumber;
 
   console.log("PHONE:- "+ phonenumber);
   client.verify.services('VA809f460d805dc50f8164e45e883e7e21')
   .verifications
   .create({
       to:phonenumber,
       channel: 'sms'
   }).then((success) => {
       res.status(200).json({
           status: 'success',
           success: success
       })
   }).catch((error) => {
       res.status(200).json({
           status: 'error',
           error: error,
            message: 'Something went wrong!'
       })
   })
}




exports.verifyToken = async(req, res, next) => {

    const code = req.body.code;
    const phonenumber = req.body.phonenumber;

   
    client.verify.services("VA809f460d805dc50f8164e45e883e7e21")
    .verificationChecks
    .create({
        
            to: phonenumber,
            code: code
        
    }).then((success) => {
        res.status(200).json({success})
    }).catch((error) => {
        res.status(401).json({status:'error' ,error, message: 'Something went wrong!'})
    })
}








exports.createUser = async(req, res, next) => {
  try {
    const userId = req.body.userId;
    const fName = req.body.fName;
    const lName = req.body.lName;
    const email = req.body.email;
    const contactNumber = req.body.contactNumber;
    const verificationStatus = req.body.verificationStatus;
    const couponCode = req.body.couponCode;
    const walletCashbackAvailable = req.body.walletCashbackAvailable;


    const user = new User({
        userId: userId,
        fName: fName,
        lName: lName,
        email: email,
        contactNumber: contactNumber,
        verificationStatus: verificationStatus,
     
        walletCashbackAvailable: walletCashbackAvailable,
        couponCode: couponCode,


    })

    user.save().then((result) => { 
        if(result){
            res.status(200).json({
                status: 'success',
                message: "Profile Created Successfully!",
                result});
        
        }
    }).catch((error) => {
      res.status(500).json({error: error, message: error.message, data:'Error in creating user'})
        
    })

    

  } catch (error) {
      res.status(500).json({error, message: error.message})
  }
}


exports.getAllUsers = async(req, res, next) =>{
    try {
        const users = await User.find({}).populate('products');

        if(users){
            res.status(200).json({
                message: 'All users',
                users
            })
        }
    } catch (error) {
      res.status(500).json({error, message: error.message})
        
    }
}



exports.getUser = async(req, res, next) => {
    try {
        const id = req.params.id;

        const user = await UserAuth.findById(id).populate('products');
        if(user){
            res.status(200).json({user, message: 'User found'})
        }
    } catch (error) {
        res.status(500).json({error, message: 'Something went wrong!'});
    }

}

exports.getUserProfile = async(req, res, next) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId).populate('cart.items.productId');
        if(user){
            res.status(200).json({user, message: 'User Profile Found!'})
        }
    } catch (error) {
        res.status(500).json({error, message: 'Something went wrong!'});
        
    }
}


exports.updateUser = async(req, res, next) => {
    try {
        const id = req.params.id;

        const user = await User.findByIdAndUpdate(id, req.body);

        if(user){
            res.status(201).json({status: 'success', user: user, message: 'Profile updated successfully!'})
        }
        
    } catch (error) {
        res.status(500).json({error, message: 'Something went wrong!'});
    }
}


exports.deleteUserProfile = async(req, res, next) => {
    try {
        const id = req.params.id;

        const user = await User.findByIdAndDelete(id);

        if(user){
            res.status(200).json({
                status: true,
                message: 'User Profile Deleted Successfully'
            })
        }
        
    } catch (error) {
        res.status(500).json({error, message: 'Something went wrong!'});
    }
}