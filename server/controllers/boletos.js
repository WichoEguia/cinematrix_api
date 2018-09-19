const express = require('express');
const _ = require('underscore');
const Boleto = require('../models/boleto');

const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');
const app = express();

app.post('/boletos/nuevo', [verificaToken, verificaAdminRole], (req, res) => {
    let body = req.body;

    let boleto = new Boleto({
        tipo: body.tipo,
        precio: body.precio,
        pedido: body.pedido
    });

    boleto.save((err, boletoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!boletoDB) {
            return res.status(500).json({
                ok: false,
                err: { message: 'No se subió registro a base de datos' }
            });
        }

        res.json({
            ok: true,
            boleto: boletoDB
        });
    });
});

app.get('/boletos/ver/:tipo?', verificaToken, (req, res) => {
    let cond = req.params.tipo ? { tipo : req.params.tipo } : {};

    Boleto.find(cond).exec((err, boletos) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!boletos) {
            return res.status(500).json({
                ok: false,
                err: { message: 'No hay boletos' }
            });
        }

        res.json({
            ok: true,
            boletos
        });
    });
});

app.put('/boletos/editar', [verificaToken, verificaAdminRole], (req, res) => {
    let id = req.params.id;
    let body = req.body;

    Boleto.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, boletoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!boletoDB) {
            return res.status(500).json({
                ok: false,
                err: { message: 'Boleto no existe en base de datos' }
            });
        }

        res.json({
            ok: true,
            boleto: boletoDB
        });
    });
});

module.exports = app;
