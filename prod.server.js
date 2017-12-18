const express = require('express');
const config = require('./config/index');

const port = process.env.PORT || config.build.port;

var app = express();
var router = express.Router();

router.get('/', function (req, res, next) {
  req.url = '/index.html';
  next();
});

app.use(router);
