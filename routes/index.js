const express = require('express')
const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const categoriesRouter = require('./categories.router');

function routerApi(app){
  const v1 = express.Router();
  app.use('/api/v1', v1);
  v1.use('/products', productsRouter);
  v1.use('/users', usersRouter);
  v1.use('/categories', categoriesRouter);
}

module.exports = routerApi;