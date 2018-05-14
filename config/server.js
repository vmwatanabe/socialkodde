var express = require('express');
var consign = require('consign');
var express_validator = require('express-validator');

var app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static('./app/public'));
app.use(express_validator());

consign().include('app/routes').into(app);

module.exports = app;