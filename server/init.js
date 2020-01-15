require('dotenv').config({silent:true})
const express = require('express');
let bodyparser = require('body-parser');
let cors = require('cors');
var app = express();
app.use(bodyparser());
app.use(cors());
module.exports = app;
require('./../config/routes')(app)
require('./../config/db')