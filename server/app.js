var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// load global configurations and mongoose
var configs = require('./configs/globals');
var mongoose = require('mongoose');
// import passport packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;


// routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var booksRouter = require('./routes/api/books');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// initialize and configure passport
app.use(passport.initialize());
passport.use(
  new BasicStrategy((username, password, done) => {
    if (
      username === configs.Credentials.Username &&
      password === configs.Credentials.Password
    ) {
      console.log('Authentication successful');
      return done(null, true);
    } else {      
      console.log('Authentication failed');
      return done(null, false);
    }
  })
)

// main routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/books', 
  passport.authenticate('basic', { session: false }),
  booksRouter
);

// MongoDB connection
mongoose
  .connect(configs.ConnectionStrings.MongoDB)
  .then(() => {
    console.log("Successfully connected to MongoDB - Assignment2 DB");
  })
  .catch((error) => {
    console.log(`Error connecting to MongoDB. ${error}`);
  });

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

module.exports = app;
