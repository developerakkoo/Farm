const Address = require('./../Models/addressModel');
const User = require('./../Models/userModel');

const io = require('./../socket');

exports.postAddress = async(req, res, next) => {
    try{
            const userId = req.body.userId;
            const googleAdd = req.body.googleadd;   
            const useradd = req.body.useradd;
            const coordinates = req.body.coordinates;
            
            
            const user = await User.find({_id: userId});
            if(!user){
                res.status(500).json({message: 'User not found'})

            }

            const add = await Address.create(req.body);
            if(!add){
                res.status(500).json({message: 'Address Create Error'})
            }

            res.status(200).json({
                add: add,
                message: 'Address created Successfully',
            })
        }
    catch(err){
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
}


exports.getAddressByUserId = async(req, res, next) => {
    try{
        const userId = req.params.userId;

        const add = await Address.find({userId: userId});

        if(add){
            res.status(200).json({
                add,
                message: 'Address Found'
            })
        }
    }
    catch(err){
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
}

exports.updateAddress = async(req, res, next) => {
    try{

    }
    catch(err){
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
}


exports.deleteAddress = async(req, res, next) => {
    try{
        const id = req.params.id;

        const add = await Address.findByIdAndDelete(id);

        if(add){
            res.status(200).json({add, message: 'Address Deleted Successfully'})
        }
    }
    catch(err){
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
}