const express = require('express');
const path = require('path')
const routes = require('./routes/index');
const bodyParser = require('body-parser');
const { flash } = require('express-flash-message')
var session = require('express-session');
var favicon = require('serve-favicon');
const app = express()
app.use(express.static('public'));
app.use(session({ cookie: {maxAge: 6000 },
                  secret: 'mygrades',
                  resave: false,
                  saveUninitialized: false}));

app.use(flash({ sessionKeyName: 'flashMessage' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')
app.locals.moment = require('moment');
app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));

app.use(bodyParser.urlencoded({extended: true}));
app.use('/', routes)

module.exports = app;