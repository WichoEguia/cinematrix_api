const mongoose = require('mongoose');

let enumEstatus = {
    values: ['activo', 'baja'],
    messages: '{VALUE} no es valido'
}

let Schema = mongoose.Schema;
let productoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del producto es requerido']
    },
    descripcion: {
        type: String,
        required: [true, 'Se requiere una descripción para el producto']
    },
    precio: {
        type: Number,
        required: [true, 'El precio del producto es necesario']
    }
});

module.exports = mongoose.model('Producto', productoSchema);