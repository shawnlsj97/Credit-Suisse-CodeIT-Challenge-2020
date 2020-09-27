
require('babel-register')
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var square = require('./routes/square').default;
var contactTrace = require('./routes/contact_trace').default;
var salad = require('./routes/salad').default;
var gmo = require('./routes/gmo_engineering').default;
var geometry = require('./routes/geometry').default;
var fruit = require('./routes/fruit_basket').default;
var cleanFloor = require('./routes/clean_floor').default;
var olympiad = require('./routes/babylon').default;
var inventory = require('./routes/inventory').default;
var cluster = require('./routes/cluster').default;
var swap = require('./routes/swap').default;
var social_distancing = require('./routes/social_distancing').default;
var portfolio = require('./routes/portfolio').default;
var slsm = require('./routes/slsm').default;
var supermarket = require('./routes/supermarket').default;

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.text());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
app.use('/square', square)
app.use('/contact_trace', contactTrace);
app.use('/inventory-management', inventory);
app.use('/salad-spree', salad);
app.use('/intelligent-farming', gmo);
app.use('/fruitbasket', fruit);
app.use('/clean_floor', cleanFloor);
app.use('/revisitgeometry', geometry);
app.use('/olympiad-of-babylon', olympiad);
app.use('/cluster', cluster);
app.use('/swaphedge', swap);
app.use('/social_distancing', social_distancing);
app.use('/optimizedportfolio', portfolio);
app.use('/slsm', slsm);
app.use('/supermarket', supermarket);

// catch 404 and forward to error handler`
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
