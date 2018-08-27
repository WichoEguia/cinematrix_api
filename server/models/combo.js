const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let comboSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    precio: {
        type: String,
        required: [true, 'El precio es necesario']
    }
});

module.exports = moongose.model('Cine', comboSchema);