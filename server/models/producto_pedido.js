const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let spSchema = new Schema({
    producto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto'
    },
    pedido: {
        type: Schema.Types.ObjectId,
        ref: 'Pedido'
    }
});

module.exports = moongose.model('Producto_pedido', spSchema);