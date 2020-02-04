const express = require('express');
const app = express();

const routers = require('./router.js');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static('assets'));

app.set('view engine', 'ejs');

app.use(routers);

app.listen(8080);