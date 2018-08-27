require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Habilitar carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));

// Configuración global de rutas
app.use(require('./controllers/index'));

mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.URL_DB, { useNewUrlParser: true }, (err, res) => {
	if (err) throw new Error(err);
	console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, () => {
	console.log(`Corriendo servidor en localhost:${process.env.PORT}`);
});
