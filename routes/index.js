var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  return res.send({
    "hello:":"aryan",
    "hyy":"op randi",
    "ayush":"kali ganda"
  });
});

module.exports = router;
