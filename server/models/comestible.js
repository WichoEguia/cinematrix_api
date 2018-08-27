const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let comestibleSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del producto es requerido']
    },
    password: {
        type: String,
        required: [true, 'El password es requerido']
    }
});

module.exports = moongose.model('Comestible', comestibleSchema);