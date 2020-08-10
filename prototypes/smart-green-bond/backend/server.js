const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const router = require('./routes');

const PORT = 3000;
const NODE_ENV = 'development';
//import routes from './routes/index.js';

const app = express();

app.set('port', PORT);
app.set('env', NODE_ENV);
app.use(logger('tiny'));
app.use(bodyParser.json());

app.use('/', require(path.join(__dirname, 'routes')));

// no mount path. Function is executed at every request 
app.use((req, res, next) => {
    const err = new Error(`${req.method} ${req.url} Not Found`);
    err.status = 404;
    next(err);
  });
  
  // no mount path. Function is executed at every request 
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500);
    res.json({
      error: {
        message: err.message,
      },
    });
  });

app.listen(PORT, () => {
    console.log(
      `Express Server started on Port ${app.get(
        'port'
      )} | Environment : ${app.get('env')}`
    );
  });