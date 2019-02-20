var express = require('express');
var router = express.Router();

const connection = require('./connect')

/* goods page. */
router.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
module.exports = router;