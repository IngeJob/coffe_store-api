const express = require('express');
const order = express.Router();
const verifyToken = require('../../../middlewares/verifyToken.config')
const orderRegister = require('./register/orderRegister.controller');
const ordersByUser = require('./get/getOrdersByUser')

order.route('/register').post( verifyToken, orderRegister )
order.route('/ordersByUser').get( verifyToken, ordersByUser )

module.exports = order