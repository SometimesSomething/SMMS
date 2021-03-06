
var express = require('express');
var router = express.Router();

var jwt=require('jsonwebtoken');

const connection = require('./connect');

router.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "authorization");
    next();
});

router.post("/logincheck",(req,res)=>{
    let{username,password}=req.body;
    const secret='LOVEME';
    const sqlStr=`select * from account where username='${username}' and password='${password}'`;
    connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        if(data.length>0){
            console.log(1)
            let dataStr=JSON.stringify(data[0]);
            let  accountInfor=JSON.parse(dataStr);
            const token = jwt.sign(accountInfor, secret, { expiresIn:60*30});
            res.send({"error_code":0,"reason":"密码正确","username":accountInfor.username ,token})
        }else{
            res.send({"error_code":1,"reason":"密码错误"})
        }
    })
});

module.exports = router;
