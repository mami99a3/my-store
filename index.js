const express = require('express');
const routerApi = require('./routes');

const { logErorrs, errorHandler } = require('./middlewares/error.handler')

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola mi server ya está corriendo en express');
});

routerApi(app);

app.use(logErorrs);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Mi puerto es:' + port);
});

