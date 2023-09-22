var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();
var User = require('../models/User.model');
var Authcontroller = require('../controller/Authentication.controller');

router.post('/login',Authcontroller.loginUser )

router.post('/register', Authcontroller.registerUser)

module.exports = router;
