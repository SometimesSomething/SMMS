var express = require('express');
var router = express.Router();

const connection = require('./connect')

/* goods page. */
router.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

router.post('/goodsadd', (req, res) => {
  let { classify, code, goodsname, price, vendibility, purchase, quantity, weight, units, offer, sales, description } = req.body;
  const sqlStr = `insert into goods(classify,code,goodsname,price,vendibility,purchase,quantity,weight,units,offer,sales, description) values ('${classify}','${code}','${goodsname}','${price}', '${vendibility}', '${purchase}','${quantity}', '${weight}', '${units}','${offer}', '${sales}', '${description}')`;
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

router.get('/goodsmanagment', (req, res) => {
  const sqlStr = 'select * from goods';
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    res.send(data);
  })
});

router.get('/goodsedit',(req,res)=>{
  let {id}=req.query;
  const sqlStr=`select * from goods where id=${id}`;
  const newLocal = connection.query(sqlStr, (err, data) => {
    if (err)
      throw err;
    res.send(data);
  });
});


module.exports = router;
