const express = require('express');
const {body} = require('express-validator');


const productController = require('../Controllers/productController');


const router = express.Router();

//GET all products
router.get('/products', productController.getProducts);
router.get('/products/:productId', productController.getSingleProduct);

router.get('/search/:query', productController.searchProduct);


//save a product
router.post('/products', productController.postAddProduct);

//remove a product
router.delete('/product/:productId', productController.postDeleteProduct);



//update a product
router.put('/product/:productId',productController.postEditProduct);


module.exports = router;
