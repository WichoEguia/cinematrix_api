const express = require('express');
const app = express();

app.use(require('./usuarios'));
app.use(require('./upload'));
app.use(require('./imagenes'));
app.use(require('./peliculas'));
app.use(require('./funciones'));
app.use(require('./productos'));
app.use(require('./pedidos'));
app.use(require('./boletos'));

module.exports = app;
