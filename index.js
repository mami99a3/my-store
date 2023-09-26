const express = require('express');
const {faker} = require('@faker-js/faker');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hola mi server ya está corriendo en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola soy un nuevo endpoint');
});

app.get('/products', (req, res) => {
  const products = [];
  const {size} = req.query;
  const limit = size || 10;
  for(let index = 0; index < limit; index ++){
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.url()
    })
  }
  res.json(products);
});

//Todo enpoint específico va antes de un enpoint dinámico
app.get('/products/filter', (req, res) => {
  res.send('Yo soy un filtro');
});

//Endpoint dinámico
app.get('/products/:id', (req, res) => {
  const {id} = req.params
  res.json([
    {
      'productId': id,
      'request': req.params,
      'type of request': typeof(req.params)
    }
  ]);
});

app.get('/categories', (req, res) => {
  res.json([
    {
      'name': 'Product 1',
      'precio': 10,
      'categorie': 'Food'
    },
    {
      'name': 'Product 2',
      'precio': 20,
      'categorie': 'Food'
    }
  ]);
});

app.get('/categories/:categorieId/products/:productId', (req, res) => {
  const {categorieId, productId} = req.params
  res.json([
    {
      'categorieId': categorieId,
      'productId': productId,
      'request': req.params,
      'type of request': typeof(req.params)
    }
  ]);
});

app.get('/products/:productId/categories/:categorieId', (req, res) => {
  const {productId, categorieId} = req.params
  res.json([
    {
      'productId': productId,
      'categorieId': categorieId,
      'request': req.params,
      'type of request': typeof(req.params)
    }
  ]);
});

app.get('/users', (req, res) => {
  const {limit, offset} = req.query;
  if(limit && offset){
    res.json({
      limit,
      offset
    });
  }
  else{
    res.send('No mandaste los parámetros query');
  }
});

app.listen(port, () => {
  console.log('Mi puerto es:' + port);
})