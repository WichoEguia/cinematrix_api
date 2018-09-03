const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let snackSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del producto es requerido']
    },
    password: {
        type: String,
        required: [true, 'El password es requerido']
    }
});

module.exports = moongose.model('Snack', snackSchema);