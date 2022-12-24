const express = require('express');
const users = express.Router();

const userRegister = require('./register/userRegister.controller');
const userLogin = require('./login/userLogin.controller');
const confirmEmail = require('./register/confirmEmail.controller');
const resendConfirmEmail = require('./register/resendConfirmEmail.controller')
const verifyToken = require('../../../middlewares/verifyToken.config')
const verifyLogin = require('./login/verifyLogin.controller');
const updateAvatar = require('./profile/updateAvatar.controller')
const updateProfile = require('./profile/updateProfile.controller')

users.route('/register').post( userRegister )
users.route('/confirm/:token').get( confirmEmail )
users.route('/resendEmail').get( verifyToken, resendConfirmEmail )
users.route('/login').post( userLogin )
users.route('/profile').put( verifyToken, updateProfile )
users.route('/verify').post( verifyToken, verifyLogin )
users.route('/avatar').post( updateAvatar )

module.exports = users