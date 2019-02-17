const mysql = require('mysql')

const connection = mysql.createConnection({
    host     : 'localhost', 
    user     : 'root', 
    password : 'root', 
    database : 'smms'  
});

connection.connect(()=>{
    console.log('数据库连接成功!')
});

module.exports =connection;