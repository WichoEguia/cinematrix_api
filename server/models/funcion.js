const mongoose = require('mongoose');

let EnumEstadoIdioma = {
    values: ['subtitulada', 'doblada', 'NA'],
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
    estado_idioma: {
        type: String,
        default: 'NA',
        enum: EnumEstadoIdioma
    },
    sala: {
        type: String,
        required: [true, 'La sala es requerida']
    },
    hora: {
        type: String,
        required: [true, 'La hora de la funcion es necesaria']
    },
    estado: {
        type: String,
        default: 'activa',
        enum: EnumEstadoFuncion
    },
    pelicula: {
        type: Schema.Types.ObjectId,
        ref: 'Pelicula'
    }
});

module.exports = mongoose.model('Funcion', funcionSchema);