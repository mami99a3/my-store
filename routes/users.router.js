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

module.exports = router