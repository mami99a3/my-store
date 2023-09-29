const express = require('express');
const {faker} = require('@faker-js/faker');

const router = express.Router();

router.get('/', (req, res) => {
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
router.get('/filter', (req, res) => {
  res.send('Yo soy un filtro');
});

//Endpoint dinámico
router.get('/:id', (req, res) => {
  const {id} = req.params;
  res.json([
    {
      'productId': id,
      'request': req.params,
      'type of request': typeof(req.params) 
    }
  ]);
});

router.get('/:productId/categories/:categorieId', (req, res) => {
  const {productId, categorieId} = req.params;
  res.json([
    {
      'productId': productId,
      'categorieId': categorieId,
      'request': req.params,
      'type of request': typeof(req.params)
    }
  ]);
});

router.post('/', (req, res) => {
  const body = req.body;
  res.json({
    message: 'Product created',
    data: body
  });
});

module.exports = router;