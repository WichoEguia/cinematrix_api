const express = require('express');
const _ = require('underscore');
const Pedido = require('../models/pedido');
const Boleto = require('../models/boleto');

const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');
const app = express();

app.post('/pedidos/crear', verificaToken, (req, res) => {
    let body = req.body;

    let pedido = new Pedido({
        'hora_llegada': body.hora_llegada,
        'boletos': body.boletos,
        'usuario': req.usuario._id,
        'funcion': body.funcion
    });

    pedido.save((err, pedidoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!pedidoDB) {
            return res.status(500).json({
                ok: false,
                err: { message: 'No se pudo crear el pedido' }
            });
        }

        res.json({
            ok: true,
            pedido: pedidoDB
        });
    });
});

app.get('/pedidos/ver', verificaToken, (req, res) => {
    Pedido.find({}).populate('boletos funcion usuario').exec((err, pedidosDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!pedidosDB) {
            return res.status(500).json({
                ok: false,
                err: { message: 'No se pudo crear el pedido' }
            });
        }

        res.json({
            ok: true,
            pedidos: pedidosDB
        });
    });
});

module.exports = app;
