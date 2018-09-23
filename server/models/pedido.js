const mongoose = require('mongoose');

let enumVigente = {
    values: ['Y', 'N'],
    messages: '{VALUE} no es valido'
}

let enumEstado = {
    values: ['pendiente', 'proceso', 'lisito'],
    messages: '{VALUE} no es un estatus valido'
}

let Schema = mongoose.Schema;
let pedidoSchema = new Schema({
    fecha_creacion: {
        type: Date,
        default: Date.now,
        required: [true, 'La fecha de creación es necesaria']
    },
    vigente: {
        type: String,
        default: 'Y',
        enum: enumVigente
    },
    hora_llegada: {
        type: String,
        required: [true, 'La hora de llegada es necesaria']
    },
    estado: {
        type: String,
        default: 'pendiente',
        enum: enumEstado
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    funcion: {
        type: Schema.Types.ObjectId,
        ref: 'Pelicula'
    },
    boletos: [{
        type: Schema.Types.ObjectId,
        ref: 'Boleto'
    }],
    pedidos: [{
        type: Schema.Types.ObjectId,
        ref: 'Producto'
    }]
});

module.exports = mongoose.model('Pedido', pedidoSchema);