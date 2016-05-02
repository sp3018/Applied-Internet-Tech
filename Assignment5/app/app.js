var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

require('./db');
var mongoose = require('mongoose');
var Movie = mongoose.model('Movie');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.get('/movies', function(req, res, next){
  var filters=req.query.director;
  if(filters){
  	Movie.find({'director':filters}, function(err, movie, count){
  		res.render('movies', {filter:filters, movie:movie});
  	});
  }
  else{
	  Movie.find({}, function(err, movie, count){
		res.render('movies', {movie: movie});    
	  });
  }	
});

app.get('/movies/add', function(req, res, next){
	res.render('add-movie');
});

app.post('/movies/add', function(req, res, next){
	new Movie({
		title: req.body.title,
		director: req.body.director,
		year: req.body.year,
	}).save(function(err, movie, count){
		res.redirect('/movies');
	});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
