const express = require('express');
const products = express.Router();
const verifyToken = require('../../../middlewares/verifyToken.config')
const getCategories =  require('./category/getCategories.controller')
const postCategory =  require('./category/postCategory.controller')
const getProductsByCategory = require('./get/getProductsByCategory.controller')
const productRegister = require('./post/productRegister.controller')

products.route('/categories').get( getCategories )
products.route('/addCategory').post( verifyToken, postCategory )
products.route('/addProduct').post( verifyToken, productRegister )
products.route('/productsByCategory').get( getProductsByCategory )
module.exports = products