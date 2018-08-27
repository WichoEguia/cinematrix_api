const mongoose = require('mongoose');

let EnumVigente = {
    values: ['Y', 'N'],
    messages: '{VALUE} no es valido'
}

let EnumEstatus = {
    values: ['pendiente', 'proceso', 'lisito'],
    messages: '{VALUE} no es un estatus valido'
}

let Schema = mongoose.Schema;
let pedidoSchema = new Schema({
    fecha_creacion: {
        type: Date,
        default: Date.now,
        required: [true, 'La fecha de creación es necesari']
    },
    vigente: {
        type: String,
        default: 'Y',
        enum: EnumVigente
    },
    fecha_llegada: {
        type: true,
        required: [true, 'La fecha de llegada es necesaria']
    },
    estatus: {
        type: String,
        default: 'pendiente',
        enum: EnumEstatus
    },
    json_comestible: {
        type: String,
        required: false
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    pelicula: {
        type: Schema.Types.ObjectId,
        ref: 'Pelicula'
    }
});

module.exports = moongose.model('Pedido', pedidoSchema);