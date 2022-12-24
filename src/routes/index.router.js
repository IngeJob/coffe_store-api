const express = require('express');
const router = express.Router();
const users = require('./controllers/users/users.router')
const products = require('./controllers/product/products.router')
const order = require('./controllers/order/order.router')

//Routes
router.use('/users', users);
router.use('/product', products)
router.use('/order', order);

module.exports = router