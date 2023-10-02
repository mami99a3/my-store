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
  const newProduct = service.create(body);
  res.status(201).json({
    message: 'Created successfully',
    data: {
      ...newProduct
    }
  });
});

router.patch('/:id', (req, res) => {
  const {id} = req.params;
  const body = req.body;
  const product_updated = service.update(id, body);
  res.json({
    message: 'Updated successfully',
    data: {
      ...product_updated
    }
  });
});

router.delete('/:id', (req, res) => {
  const {id} = req.params;
  const product_deleted = service.delete(id);
  res.json({
    message: 'Deleted successfully',
    data: {
      ...product_deleted
    }
  });
});

module.exports = router;