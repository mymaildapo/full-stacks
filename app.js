const createError = require('http-errors');
const express = require('express');

const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');

const product = require('./api/product');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.get('/',(req, res) => {
  res.json({
    message: 'Hello Dapo'
  })
});

app.use('/api/v1/products',product);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ //if we get an error we get back json object,
    message : err.message, // tell us error message
    error: req.app.get('env') === 'development' ? err.stack : {} //tell us stack trace
  });
});

module.exports = app;
