const express = require('express');
const _ = require('underscore');
const Pedido = require('../models/pedido');
const Boleto = require('../models/boleto');

const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');
const app = express();

app.post('/pedidos/crear', verificaToken, (req, res) => {
    let body = req.body;

    // Obtener boletos
    boletos = getBoletos(body.boletos);

    // Obtener productos
    productos = getProductos(body.productos);

    let pedido = new Pedido({
        boletos,
        productos,
        fecha_llegada: body.fecha_llegada,
        asientos: body.asientos,
        monto: body.monto,
        usuario: req.usuario._id,
        funcion: body.funcion
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

let getBoletos = (boletos) => {
    let resultado = [];
    boletos.forEach(b => {
        arr_b = b.split(',');
        for (let i = 0; i < arr_b[1]; i++) {
            resultado.push(arr_b[0]);
        }
    });

    return resultado;
}

let getProductos = (productos) => {
    let resultado = [];
    productos.forEach(p => {
        arr_p = p.split(',');
        for (let i = 0; i < arr_p[1]; i++) {
            resultado.push(arr_p[0]);
        }
    });

    return resultado;
}

module.exports = app;
