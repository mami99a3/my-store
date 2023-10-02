const express = require('express');
const ProductsService = require('./../services/products.service');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

//Todo enpoint específico va antes de un enpoint dinámico
router.get('/filter', async (req, res) => {
  res.send('Yo soy un filtro');
});

//Endpoint dinámico
router.get('/:id', async (req, res) => {
  const {id} = req.params;
  const product = await service.findOne(id);
  if(product){
    res.status(200).json(product);
  }
  else{
    res.status(404).json({
      message: 'Error! id => ' + id + ' not found'
    });
  }
});

router.get('/:productId/categories/:categorieId', async (req, res) => {
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

router.post('/', async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json({
    message: 'Created successfully',
    data: {
      ...newProduct
    }
  });
});

router.patch('/:id', async (req, res) => {
  try {  
    const {id} = req.params;
    const body = req.body;
    const product_updated = await service.update(id, body);
    res.json({
      message: 'Updated successfully',
      data: {
        ...product_updated
      }
    });
  }
  catch(error){
    res.status(404).json({
      message: error.message
    });
  }
});

router.delete('/:id', async (req, res) => {
  const {id} = req.params;
  const product_deleted = await service.delete(id);
  res.json({
    message: 'Deleted successfully',
    data: {
      ...product_deleted
    }
  });
});

module.exports = router;