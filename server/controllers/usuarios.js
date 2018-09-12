const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const app = express();

app.post('/usuario/login', (req, res) => {
	let body = req.body;

	Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}

		if (!usuarioDB) {
			return res.status(400).json({
				ok: false,
				err: { message: 'Usuario o contraseña incorrectos' }
			});
		}

		if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
			return res.status(400).json({
				ok: false,
				err: { message: 'Usuario o contraseña incorrectos' }
			});
		}

		let token = jwt.sign({
			usuario: usuarioDB
		}, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

		res.json({
			ok: true,
			usuario: usuarioDB,
			token
		});
	});
});

app.post('/usuario/registro', (req, res) => {
	let body = req.body;

	let usuario = new Usuario({
		'nombre': body.nombre,
		'email': body.email,
		'password': bcrypt.hashSync(body.password, 10),
		'role': body.role
	});

	usuario.save((err,usuarioDB) => {
		if (err) {
			return res.status(500).json({
				ok: false,
				err
			});
		}

		res.json({
			ok: true,
			usuario: usuarioDB
		});
	});
});

module.exports = app;
