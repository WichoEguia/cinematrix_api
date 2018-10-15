const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const app = express();

const Pelicula = require('../models/pelicula');
const Producto = require('../models/producto');

// default options
app.use(fileUpload());

app.put('/upload/:tipo/:id', (req, res) => {
	let tipo = req.params.tipo;
	let id = req.params.id;

	let tiposValidos = ['pelicula', 'producto'];

	if (!tiposValidos.includes(tipo)) {
		return res.status(400).json({
			ok: false,
			err: { message: `Los tipos permitidos son ${tiposValidos.join(', ')}` }
		});
	}

	if (!req.files) {
    return res.status(400).json({
			ok: false,
			err: { message: 'No se ha seleccionado ningún archivo' }
		});
	}

	let file = req.files.archivo;

	// Extenciones validas
	let extencionesValidas = ['png', 'gif', 'jpg', 'jpeg'];
	let nombreArchivo = file.name.split('.');
	let extencion = nombreArchivo[nombreArchivo.length - 1];

	if (!extencionesValidas.includes(extencion)) {
		return res.status(400).json({
			ok: false,
			ext: extencion,
			err: { message: `Las extenciones validas son ${extencionesValidas.join(', ')}` }
		});
	}

	// Cambiar nombre al archivo
	let nombreArchivoNuevo = `${id}-${(new Date().getMilliseconds())}.${extencion}`

	file.mv(`uploads/${tipo}/${nombreArchivoNuevo}`, (err) => {
    if (err) {
      return res.status(500).json({
				ok: false,
				err
			});
		}

		switch (tipo) {
			case 'pelicula':
				imagenPelicula(id, res, nombreArchivoNuevo);
				break;

			case 'producto':
				imagenProducto(id, res, nombreArchivoNuevo);
				break;
		}
  });
});

function imagenPelicula(id, res, nombreArchivo) {
	Pelicula.findById(id, (err, peliculaDB) => {
		if (err) {
			borraArchivo(nombreArchivo, 'pelicula');
			return res.status(500).json({
				ok: false,
				err
			});
		}

		if (!peliculaDB) {
			return res.status(400).json({
				ok: true,
				err: { message: 'Usuario no existe en base de datos' }
			});
		}

		borraArchivo(peliculaDB.image, 'pelicula');

		peliculaDB.image = nombreArchivo;
		peliculaDB.save((err, peliculaGuardada) => {
			if (err) {
				return res.status(500).json({
					ok: false,
					err
				});
			}

			res.json({
				ok: true,
				usuario: peliculaGuardada
			});
		});
	});
}

function imagenProducto(id, res, nombreArchivo) {
	Producto.findById(id, (err, productoBD) => {
		if (err) {
			borraArchivo(nombreArchivo, 'productos');
			return res.status(500).json({
				ok: false,
				err
			});
		}

		if (!productoBD) {
			return res.stats(400).json({
				ok: true,
				err: { message: 'Producto no existe en base de datos' }
			});
		}

		borraArchivo(productoBD.imagen, 'productos');

		productoBD.imagen = nombreArchivo;
		productoBD.save((err, productoGuardado) => {
			if (err) {
				return res.status(500).json({
					ok: false,
					err
				});
			}

			res.json({
				ok: true,
				producto: productoGuardado
			});
		});
	});
}

function borraArchivo(nombreImagen, tipo) {
	let pathImage = path.resolve(__dirname, `../../uploads/${ tipo }/${ nombreImagen }`);
	if (fs.existsSync(pathImage)) {
		fs.unlinkSync(pathImage);
	}
}

module.exports = app;
