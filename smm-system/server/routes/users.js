var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  res.header("Access-Control-Allow-Headers", "authorization");
});

module.exports = router;
