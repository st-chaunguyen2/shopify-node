'use strict';
const express = require('express');
const app = express();
require('dotenv').config();
const Env = process.env;
const postRoute = require('./routes/post')
const authRoute = require('./routes/auth')
const productRoute = require('./routes/product')
const cors = require('cors');


//CORS Middleware
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

app.use(express.json());

const http = require('http').Server(app);
http.listen(Env.PORT, () => {
  console.log(`Server run on port: ${Env.PORT}`);
});

const routePrefix = '/api/v1'

// app.use(`${routePrefix}/auth`, authRoute)
// app.use(`${routePrefix}/posts`, postRoute)

app.use(`${routePrefix}/products`, productRoute)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const error = {
    error: 404,
    message: 'not_found',
    status: 400,
    data: null,
  }
  next(error)
})

// error handler
app.use((err, req, res, next) => {
  return res.json({
    error: err.error,
    message: err.message,
    status: 400,
    data: null,
  })
})
