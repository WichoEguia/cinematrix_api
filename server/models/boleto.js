const mongoose = require('mongoose');

let enumTipo = {
    values: ['Y', 'N'],
    messages: '{VALUE} no es valido'
}

let Schema = mongoose.Schema;
let boletoSchema = new Schema({
    tipo: {
        type: String,
        default: 'adulto',
        enum: enumTipo
    },
    precio: {
        type: String,
        required: [true, 'El precio del boleto es requerido']
    },
    pedido: {
        type: Schema.Types.ObjectId,
        ref: 'Pedido'
    }
});

module.exports = moongose.model('Boleto', boletoSchema);