//存入数据库const mysql = require("mysql");const connection = mysql.createConnection({    host:"localhost",    user:"root",    password:"root",    port:"33060",    database:"smms"});connection.connect(()=>{    console.log("连接数据库成功")});module.exports = connection;