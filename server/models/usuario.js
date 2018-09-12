const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let enumRolesValidos = {
	values: ["ADMIN_ROLE", "USER_ROLE"],
	message: '{VALUE} no es un rol valido'
}

let enumEstado = {
	values: ["activo", "baja"],
	message: '{VALUE} no es un rol valido'
}

let Schema = mongoose.Schema;
let usuarioSchema = new Schema({
	nombre: {
		type: String,
		required: [true, "El nombre es necesario"]
	},
	email: {
		type: String,
		unique: true,
		required: [true, "El correo es necesario"]
	},
	password: {
		type: String,
		required: [true, "El password es necesario"]
	},
	role: {
		type: String,
		default: "USER_ROLE",
		enum: enumRolesValidos
	},
	estado: {
		type: String,
		default: 'activo',
		enum: enumEstado
	}
});

usuarioSchema.methods.toJSON = function() {
	let user = this;
	let userObject = user.toObject();
	delete userObject.password;

	return userObject;
}

usuarioSchema.plugin(uniqueValidator, {
	message: '{PATH} debe de ser unico'
});

module.exports = mongoose.model('Usuario', usuarioSchema);
