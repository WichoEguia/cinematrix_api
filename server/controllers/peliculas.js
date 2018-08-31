const express = require('express');
const _ = require('underscore');
const Pelicula = require('../models/pelicula');

const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');
const app = express();

app.post('/peliculas/nuevo', [verificaToken, verificaAdminRole], (req, res) => {
    var body = req.body;

    var pelicula = new Pelicula({
        'titulo': body.titulo,
        'director': body.director,
        'sinopsis': body.sinopsis,
        'subtitulada': body.subtitulada,
        'idioma': body.idioma,
        'duracion': body.duracion,
        'clasificacion': body.clasificacion
    });

    pelicula.save((err, peliculaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            pelicula: peliculaDB
        });
    });
});

app.get('/peliculas/ver', verificaToken, (req, res) => {
    let desde = Number(req.query.desde || 0);
    let limite = Number(req.query.hasta || 5);

    Pelicula.find({estatus: 'activo'}, 'titulo director').limit(limite).skip(desde).exec((err, peliculas) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!peliculas) {
            return res.status(500).json({
                ok: false,
                err: { message: 'no hay peliculas en la base de datos' }
            });
        }

        res.json({
            ok: true,
            peliculas
        });
    });
});

app.get('/peliculas/ver/:id', verificaToken, (req, res) => {
    let id = req.params.id;

    Pelicula.findById(id).exec((err, peliculaBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!peliculaBD) {
            return res.status(500).json({
                ok: false,
                err: { message: 'Pelicula no existe en base de datos' }
            });
        }

        res.json({
            ok: true,
            pelicula: peliculaBD
        });
    });
});

app.put('/peliculas/actualizar/:id', [verificaToken, verificaAdminRole], (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['sinopsis', 'subtitulada', 'idioma', 'clasificacion', 'estatus']);

    Pelicula.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, peliculaBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!peliculaBD) {
            return res.status(500).json({
                ok: false,
                err: { message: 'Pelicula no existe en base de datos' }
            });
        }

        res.json({
            ok: true,
            pelicula: peliculaBD
        });
    });
});

app.delete('/peliculas/baja/:id', [verificaToken, verificaAdminRole], (req, res) => {
    let id = req.params.id;

    Pelicula.findByIdAndUpdate(id, {estatus: 'baja'}, {new: true, runValidators: true}, (err, peliculaBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!peliculaBD) {
            return res.status(500).json({
                ok: false,
                err: { message: 'Pelicula no existe en base de datos' }
            });
        }

        res.json({
            ok: true,
            pelicula: peliculaBD
        });
    });
});

module.exports = app;