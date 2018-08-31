const express = require('express');
const app = express();

app.use(require('./usuarios'));
app.use(require('./upload'));
app.use(require('./imagenes'));
app.use(require('./peliculas'));

module.exports = app;
