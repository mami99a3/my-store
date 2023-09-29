const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
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

router.get('/:categorieId/products/:productId', (req, res) => {
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

module.exports = router;