const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  const {limit, offset} = req.query;
  if(limit && offset){
    res.json({
      message: 'Parámetros Query capturados correctamente',
      limit,
      offset
    });
  }
  else{
    res.send('No mandaste los parámetros query');
  }
});

router.post('/', (req, res) => {
  const body = req.body;
  res.json({
    message: "Created successfully",
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

module.exports = router