const express = require('express');const router = express.Router();const connection = require("./connect");router.all("*",(req,res,next)=>{    //设置响应头    res.setHeader("Access-Control-Allow-Origin", "*");    next();});/* GET users listing. */router.get('/', function(req, res, next) {    res.send('respond with a resource');});router.post("/checklogin",(req,res)=>{    let {username,password} = req.body;    const sqlStr = `select * from account where username="${username}" and password= "${password}"`;    connection.query(sqlStr,(err,data)=>{        if(err) throw err;        if(!data.length){            res.send({"error_code":1,"reason":"请检查用户或密码"});        }else{            res.send({"error_code":0,"reason":"欢迎，登陆成功"});        }        console.log(data)    })})module.exports = router;