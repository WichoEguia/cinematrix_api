const mongoose = require('mongoose');

let enumIdioma = {
    values: ['subtitulada', 'español', 'idioma original'],
    messages: '{VALUE} no es valido'
};

let EnumEstadoFuncion = {
    values: ['activa', 'baja'],
    messages: '{VALUE} no es valido'
}

let Schema = mongoose.Schema;
let funcionSchema = new Schema({
    fecha: {
        type: String,
        required: [true, 'La fecha es requerida']
    },
    idioma: {
        type: String,
        default: 'idioma original',
        enum: enumIdioma
    },
    sala: {
        type: String,
        required: [true, 'La sala es requerida']
    },
    hora: {
        type: String,
        required: [true, 'La hora de la funcion es necesaria']
    },
    pelicula: {
        type: Schema.Types.ObjectId,
        ref: 'Pelicula'
    }
});

module.exports = mongoose.model('Funcion', funcionSchema);