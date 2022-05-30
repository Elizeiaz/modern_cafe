var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var lessMiddleware = require('less-middleware');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aboutRouter = require('./routes/about')
var staffRouter = require('./routes/staff')
var bookingRouter = require('./routes/booking')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);
app.use('/staff', staffRouter);
app.use('/booking', bookingRouter)

// Попытка седалть пост
// app.post('/booking', function (req, res){
//   console.log(req.body.name + '\n'
//   + req.body.phone + '\n'
//   + req.body.email + '\n'
//   + new Date(req.body.datetime) + '\n'
//   + new Date(req.body.datetime).setTime(this.getTime() + (req.body.hours * 60 * 60 * 1000)))
// });

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

// Устанавливаем соединение с mongoose
var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://admin:admin@cafe.hjatw.mongodb.net/test';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = app;
