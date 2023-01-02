const express = require('express');
const order = express.Router();
const verifyToken = require('../../../middlewares/verifyToken.config')
const orderRegister = require('./register/orderRegister.controller');
const ordersByUser = require('./get/getOrdersByUser')
const packagedOrders = require('./get/getPackagedOrders')

order.route('/register').post( verifyToken, orderRegister )
order.route('/ordersByUser').get( verifyToken, ordersByUser )
order.route('/packagedOrders').get( verifyToken, packagedOrders )

module.exports = order