const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const placedOrderSchema = new Schema({

   totalAmount:{
       type: Number,
       required: true,
   },

   userId: {
       type: Schema.Types.ObjectId,
       ref: 'User',
       required: true

   },

   productId:{
       type: Schema.Types.ObjectId,
        ref: 'Product',
       required: true
   },

   Address:{
       type: String,
       required: [true, 'Address is required']
   },

   cordinates:{
       type: [Number]
   },

   status: {
       type: String,
       required: true,
       default: 'Ready to dispatch.'
   }
    
});


module.exports = mongoose.model('PlacedOrder', placedOrderSchema);