const express = require('express');
const Funcion = require('../models/funcion');

const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');
const app = express();

app.post('/funciones/nueva', [verificaToken, verificaAdminRole], (req, res) => {
    let body = req.body;

    let funcion = new Funcion({
        'fecha': body.fecha,
        'idioma_original': body.idioma_original,
        'estado_idioma': body.estado_idioma,
        'sala': body.sala,
        'pelicula': body.pelicula,
        'hora': body.hora
    });

    funcion.save((err, funcionDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            funcion: funcionDB
        });
    });
});

app.get('/funciones/ver', verificaToken, (req, res) => {
    Funcion.find().exec((err, funciones) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!funciones) {
            return res.status(500).json({
                ok: false,
                err: { message: 'no hay funciones en la base de datos' }
            });
        }

        res.json({
            ok: true,
            funciones
        });
    });
});

module.exports = app;
