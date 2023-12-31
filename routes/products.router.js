const express = require('express');
const ProductsService = require('./../services/products.service');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

//Un enpoint especifico va antes de un enpoint dinamico
router.get('/filter', (req, res) => {
  res.send('Yo soy un filtro');
});

//Enpoint dinámico
router.get('/:id', async (req, res, next) => {
  try{
    const { id } = req.params;
    const product = await service.findOne(id);
    res.json(product);
  }
  catch(error){
    next(error);
  }
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

router.patch('/:id', async (req, res, next) => {
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
    next(error);
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