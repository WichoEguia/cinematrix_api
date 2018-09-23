const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let enumClasificacion = {
    values: ['A', 'B', 'B-15', 'C', 'D'],
    messages: '{VALUE} no es valido'
}

let estadoEnum = {
    values: ['activo', 'baja'],
    message: '{VALUE} no es valido'
}

let Schema = mongoose.Schema;
let peliculaSchema = new Schema({
    titulo: {
        type: String,
        unique: true,
        required: [true, 'El titulo es requerido']
    },
    director: {
        type: String,
        required: [true, 'El nombre del director es requerido']
    },
    sinopsis: {
        type: String,
        required: [true, 'La sinopsis es requerida']
    },
    duracion: {
        type: String,
        required: [true, 'La duracion es requerida']
    },
    clasificacion: {
        type: String,
        enum: enumClasificacion
    },
    genero: {
        type: String,
        required: [true, 'El genero es requerido']
    },
    estado: {
        type: String,
        enum: estadoEnum,
        default: 'activo'
    },
    image: {
        type: String,
        default: 'null'
    }
});

peliculaSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser unico'
});

module.exports = mongoose.model('Pelicula', peliculaSchema);