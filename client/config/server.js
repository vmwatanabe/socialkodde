var express = require('express');
var consign = require('consign');
var crypto = require('crypto');
var express_validator = require('express-validator');
var body_parser = require('body-parser');
var express_session = require('express-session');

var app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static('./app/public'));
app.use(express_validator());
app.use(express_session({
    secret: 'eusou1337',
    resave: false,
    saveUninitialized: false
}));

app.use(body_parser.urlencoded({extended: true}));

consign()
    .include('app/routes')
    .then('config/dbConnection.js')
    .then('app/models')
    .then('app/controllers')
    .into(app);

module.exports = app;