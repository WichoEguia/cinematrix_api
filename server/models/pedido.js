const mongoose = require('mongoose');

let enumEstado = {
    values: ['pendiente', 'proceso', 'listo'],
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
        type: Boolean,
        default: true
    },
    fecha_llegada: {
        type: Date,
        required: [true, 'La hora de llegada es necesaria']
    },
    estado: {
        type: String,
        default: 'pendiente',
        enum: enumEstado
    },
    asientos: {
        type: String,
        required: [true, 'Selecciona tus asientos']
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
    productos: [{
        type: Schema.Types.ObjectId,
        ref: 'Producto'
    }]
});

module.exports = mongoose.model('Pedido', pedidoSchema);