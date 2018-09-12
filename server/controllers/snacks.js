const express = require('express');
const _ = require('underscore');
const Snack = require('../models/snack');

const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');
const app = express();

app.post('/snacks/nuevo', [verificaToken, verificaAdminRole], (req, res) => {
    let body = req.body;

    let snack = new Snack({
        nombre: body.nombre,
        descripcion: body.descripcion,
        cantidad: body.cantidad,
        precio: body.precio,
        tamano: body.tamano,
        estatus: body.estatus
    });

    snack.save((err, snackDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!snackDB) {
            return res.status(500).json({
                ok: false,
                err: { message: 'Snack no existe en base de datos' }
            });
        }

        res.json({
            ok: true,
            snack: snackDB
        });
    });
});

app.get('/snacks/ver', verificaToken, (req, res) => {
    Snack.find().exec((err, snacks) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!snacks) {
            return res.status(500).json({
                ok: false,
                err: { message: 'No hay snacks en la base de datos' }
            });
        }

        res.json({
            ok: true,
            snacks
        });
    });
});

module.exports = app;
