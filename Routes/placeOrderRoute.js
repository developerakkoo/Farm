const express = require('express');
const placedOrderController = require('../Controllers/placedOrderController');

const router = express.Router();

router.get('/place/:userId', placedOrderController.getOrderByUser);
router.get('/place/order/:orderId', placedOrderController.getOrder);

router.post('/place', placedOrderController.placeOrder);

router.delete('/place/:id',placedOrderController.deletePlacedOrder);




module.exports = router;