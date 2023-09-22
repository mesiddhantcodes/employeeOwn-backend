var express = require('express');
var router = express.Router();
var UserController = require('../controller/User.controller');

router.post ('/getMyTask',UserController.getMyTask);

module.exports = router;