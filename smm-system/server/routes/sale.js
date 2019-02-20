var express = require('express');
var router = express.Router();

const connection = require('./connect')

/* goods page. */
router.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "authorization");
  next();
});
module.exports = router;