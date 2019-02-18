var express = require('express');
var router = express.Router();

const connection = require('./connect')

router.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

router.post('/commoditystorage', (req, res) => {
    let {code,purchase,storage} = req.body;
    const sqlStr = `update goods set purchase= ${purchase},storage=${storage} where code=${code}`;
    connection.query(sqlStr, (err, data) => {
      if (err) throw err;
      // 判断受影响的行数
      if (data.affectedRows > 0) {
        // 如果大于0 代表插入成功 那么就给前端返回成功的数据对象
        res.send({ "error_code": 0, "reason": "插入数据成功" });
      } else {
        // 失败：返回给前端失败的数据对象
        res.send({ "error_code": 1, "reason": "插入数据失败" });
      }
    })
  });
  
  router.get('/inventorymanagement', (req, res) => {
    const sqlStr = 'select * from goods';
    connection.query(sqlStr, (err, data) => {
      if (err) throw err;
      res.send(data);
    })
  
  })
  
  
  module.exports = router;
