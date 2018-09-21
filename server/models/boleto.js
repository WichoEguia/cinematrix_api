const mongoose = require('mongoose');

let enumTipo = {
    values: ['niño', 'adulto', 'adulto mayor'],
    messages: '{VALUE} no es un tipo valido de boleto'
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
    }
});

module.exports = mongoose.model('Boleto', boletoSchema);