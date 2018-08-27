// PUERTO
process.env.PORT = process.env.PORT || 3000;

// ENTORNO
// let env = process.env.NODE_ENV || 'dev';
let env = 'dev';

// BASE DE DATOS
let urlDB = '';

if (env === 'dev') {
	urlDB = 'mongodb://localhost:27017/cinematrix';
} else {
	urlDB = process.env.MONGO_URL;
}

process.env.URL_DB = urlDB;

// Vencimiento del token
process.env.CADUCIDAD_TOKEN = '48h';

// seed token
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// Google client ID
process.env.CLIENT_ID = process.env.CLIENT_ID || '991528887736-7b0krg8jrvv2koetdfmldr44b2ce1emn.apps.googleusercontent.com';
