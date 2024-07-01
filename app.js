var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var basicAuth = require('basic-auth');

const indexRouter = require('./routes/index');
const sectionsRouter = require('./routes/sections');

var app = express();


// Autenticación básica
const auth = function (req, res, next) {
    var user = basicAuth(req);

    if (!user || user.name !== 'prtadmin' || user.pass !== '2024d@vid!') {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        return res.status(401).send();
    }
    next();
};


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Servir Fabric.js desde node_modules
app.use('/fabric', express.static(path.join(__dirname, 'node_modules/fabric/dist')));

// Aplicar autenticación básica para todas las rutas
app.use(auth);

app.use('/', indexRouter);
app.use('/api/sections', sectionsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
