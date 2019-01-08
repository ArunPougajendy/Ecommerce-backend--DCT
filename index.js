const express = require('express');
const app = express();
const port = 3000;
const { routes } = require('./config/routes');
//const { homeRouter } = require('./config/routes');
const { mongoose } = require('./config/db');
app.use(express.json());

app.use('/', routes);


app.listen(port, function() {
    console.log('Listenting to Port', port);
})