const jwt = require('jsonwebtoken');

// Verificar token
let verificaToken = (req, res, next) => {
	let token = req.get('token');

	jwt.verify(token, process.env.SEED, (err, decoded) => {
		if (err) {
			return res.status(401).json({
				ok: false,
				err: {
					message: 'Token no valido'
				}
			});
		}

		req.usuario = decoded.usuario;
		next();
	});
};

// Verificar Admin Role
let verificaAdminRole = (req, res, next) => {
	let usuario = req.usuario;

	if (usuario.role != 'ADMIN_ROLE') {
		return res.status(401).json({
			ok: false,
			err: {
				message: 'Función disponible solo para el administrador'
			}
		});
	}

	next();
}

let verificaTokenImg = (req, res, next) => {
	let token = req.query.token;

	jwt.verify(token, process.env.SEED, (err, decoded) => {
		if (err) {
			return res.status(401).json({
				ok: false,
				err: {
					message: 'Token no valido'
				}
			});
		}

		req.usuario = decoded.usuario;
		next();
	});
}

module.exports = {
	verificaToken,
	verificaAdminRole,
	verificaTokenImg
};
