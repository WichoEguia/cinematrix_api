const mongoose = require('mongoose');

let EnumSubtitulada = {
    values: ['Y', 'N'],
    messages: '{VALUE} no es valido'
}

let EnumClasificacion = {
    values: ['A', 'B', 'B-15', 'C', 'D'],
    messages: '{VALUE} no es valido'
}

let Schema = mongoose.Schema;
let peliculaSchema = new Schema({
    titulo: {
        type: String,
        required: [true, 'El titulo es requerido']
    },
    director: {
        type: String,
        required: [true, 'El nombre del director es requerido']
    },
    sinopsis: {
        type: String
    },
    subtitulada: {
        type: String,
        enum: EnumSubtitulada
    },
    duracion: {
        type: String,
        required: [true, 'La duracion es requerida']
    },
    clasificacion: {
        type: String,
        enum: EnumClasificacion
    },
    cine: {
        type: Schema.Types.ObjectId,
        ref: 'Cine'
    }
});

module.exports = moongose.model('Pelicula', peliculaSchema);