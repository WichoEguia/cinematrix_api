// PUERTO
process.env.PORT = process.env.PORT || 3000;

// ENTORNO
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// BASE DE DATOS
let urlDB = '';

if (process.env.NODE_ENV === 'dev') {
	urlDB = 'mongodb://localhost:27017/cinematrix';
} else {
	urlDB = process.env.MONGO_URL;
	// urlDB = 'mongodb://cinematrix:therainsong96@ds251112.mlab.com:51112/cinematrix'
}

process.env.URL_DB = urlDB;

// Vencimiento del token
process.env.CADUCIDAD_TOKEN = '48h';

// seed token
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';
