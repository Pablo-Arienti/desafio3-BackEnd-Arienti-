const express = require('express');
const app = express();
const port = 8080;
const fs = require('fs');


app.use(express.json());


app.get('/products', (req, res) => {

  fs.readFile('productos.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al leer productos.' });
      return;
    }
    const produtos = JSON.parse(data);
    res.json(produtos);
  });
});

app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  fs.readFile('productos.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al leer productos.' });
      return;
    }
    const produtos = JSON.parse(data);
    const producto = produtos[productId];
    if (producto) {
      res.json(producto);
    } else {
      res.status(404).json({ error: 'El producto no existe.' });
    }
  });
});


app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
