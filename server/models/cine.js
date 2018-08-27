const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let cineSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        rel: 'Usuario'
    }
});

module.exports = moongose.model('Cine', cineSchema);