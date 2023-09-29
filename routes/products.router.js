const express = require('express');
const ProductsService = require('./../services/products.service');

const router = express.Router();
const service = new ProductsService();

router.get('/', (req, res) => {
  const products = service.find();
  res.json(products);
});

//Todo enpoint específico va antes de un enpoint dinámico
router.get('/filter', (req, res) => {
  res.send('Yo soy un filtro');
});

//Endpoint dinámico
router.get('/:id', (req, res) => {
  const {id} = req.params;
  const product = service.findOne(id);
  if(product){
    res.status(200).json(product);
  }
  else{
    res.status(404).json({
      message: 'Error! id => ' + id + ' not found'
    });
  }
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
  res.status(201).json({
    message: 'Created successfully',
    data: body
  });
});

router.patch('/:id', (req, res) => {
  const {id} = req.params;
  const body = req.body;
  res.json({
    message: 'Updated successfully',
    data: body,
    id
  });
});

router.delete('/:id', (req, res) => {
  const {id} = req.params;
  res.json({
    message: 'Deleted successfully',
    id
  });
});

module.exports = router;