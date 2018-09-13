const express = require('express');
const _ = require('underscore');
const Producto = require('../models/producto');

const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');
const app = express();

app.post('/productos/nuevo', [verificaToken, verificaAdminRole], (req, res) => {
    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        descripcion: body.descripcion,
        precio: body.precio,
        estado: body.estado
    });

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(500).json({
                ok: false,
                err: { message: 'Producto no existe en base de datos' }
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        });
    });
});

app.get('/productos/ver', verificaToken, (req, res) => {
    Producto.find().exec((err, productos) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productos) {
            return res.status(500).json({
                ok: false,
                err: { message: 'No hay productos en la base de datos' }
            });
        }

        res.json({
            ok: true,
            productos
        });
    });
});

app.put('/productos/editar/:id', [verificaToken, verificaAdminRole], (req, res) => {
    let id = req.params.id;
    let body = req.body;

    Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(500).json({
                ok: false,
                err: { message: 'Producto no existe en base de datos' }
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        });
    });
});

app.delete('/productos/baja/:id', [verificaToken, verificaAdminRole], (req, res) => {
    let id =req.params.id;

    Producto.findByIdAndUpdate(id, { estado: 'baja' }, { new: true, runValidators: true }, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(500).json({
                ok: false,
                err: { message: 'Producto no existe en base de datos' }
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        });
    });
});

module.exports = app;
