const PlacedOrder = require('../Models/placeOrderModel');


exports.placeOrder = async(req, res, next) =>
{
    try {
        const title = req.body.title;
        const image = req.body.image;
        const totalAmount = req.body.amount;
        const userId = req.body.userId;
        const productId = req.body.productId;
        const status = req.body.status;

        const order = await PlacedOrder.create(req.body);
        if(order){
            res.status(200).json({status: 'success', order});
        }

    } catch (error) {
        
        
        res.status(200).json({
            status: 'error',
            error: error.message
        })
    }
}


exports.deletePlacedOrder = async(req, res, next) => {
    try {
        const orderId = req.params.id;
        const order = await PlacedOrder.findByIdAndDelete(orderId);

        if(order){
            res.status(200).json({
                status: 'success',
                message: 'Order Cancled Successfully!'
            })
        }

    } catch (error) {
        res.status(401).json({
            status: 'error',
            error: error.message
        })
    }
}


exports.getOrder = async(req, res, next) =>
{
    try {
        const id = req.params.orderId;

        const order = await PlacedOrder.findById(id).populate('productId userId');
        if(order){
            res.status(200).json({
                order,
                status: true,
                message: 'Found Order'
            })
        }
    } catch (error) {
        res.status(401).json({
            status: 'error',
            error: error.message
        })
    }
}

exports.getOrderByUser = async(req, res, next) => {
    try {
        const userId = req.params.userId;

        PlacedOrder.find({ userId: userId}).populate('productId userId')
        .then((order) => {
            if(order){
                res.status(200).json({
                    status: 'success',
                    order: order
                })
            }
        })
    } catch (error) {
        res.status(401).json({
            status: 'error',
            error: error.message
        })
    }
}