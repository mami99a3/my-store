const express = require('express');
const routerApi = require('./routes')

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola mi server ya está corriendo en express');
});

app.listen(port, () => {
  console.log('Mi puerto es:' + port);
});

routerApi(app);