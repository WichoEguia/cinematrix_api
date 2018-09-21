const express = require('express');
const _ = require('underscore');
const Pedido = require('../models/pedido');
const Boleto = require('../models/boleto');

const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');
const app = express();

app.post('/pedidos/crear', verificaToken, (req, res) => {
    getBoletos().then((res_boletos) => {
        let body = req.body;

        // Obtener boletos
        let boletos = [];
        body.boletos.forEach(b => {
            boleto = b.split(',');
            for (let i = 0; i < boleto[1]; i++) {
                var result = res_boletos.filter((obj) => {
                    return obj.tipo === boleto[0]
                });
                boletos.push(result[0]._id);
            }
        });

        let pedido = new Pedido({
            'hora_llegada': body.hora_llegada,
            'boletos': boletos,
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
    }, (err) => {
        return res.status(500).json({
            ok: false,
            err
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

let getBoletos = () => {
    return new Promise((resolve, reject) => {
        Boleto.find().exec((err, boletos) => {
            if (err) {
                reject({
                    ok: false,
                    err
                });
            }

            resolve(boletos);
        });
    });
}

module.exports = app;
