var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var accountRouter=require('./routes/account');
var goodsRouter=require('./routes/goods');
var inventoryRouter=require('./routes/inventory');
var loginRouter=require('./routes/login');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 分配路由
app.use('/', indexRouter);
app.use('/account', accountRouter);
app.use('/goods', goodsRouter);
app.use('/inventory',inventoryRouter);
app.use("/login",loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(5555,()=>{
  console.log("后台服务器启动成功，地址是：http://172.16.9.67:5555")
});
module.exports = app;
