const express = require('express');
const _ = require('underscore');
const Pelicula = require('../models/pelicula');

const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');
const app = express();

app.post('/peliculas/nuevo', [verificaToken, verificaAdminRole], (req, res) => {
    let body = req.body;

    let pelicula = new Pelicula({
        'titulo': body.titulo,
        'director': body.director,
        'sinopsis': body.sinopsis,
        'duracion': body.duracion,
        'clasificacion': body.clasificacion,
        'genero': body.genero,
        'anio': body.anio,
        'image': body.image
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
    Pelicula.find({}, 'titulo director duracion image').exec((err, peliculas) => {
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

app.get('/peliculas/detalle/:id', verificaToken, (req, res) => {
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

app.put('/peliculas/editar/:id', [verificaToken, verificaAdminRole], (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['sinopsis', 'subtitulada', 'idioma', 'clasificacion', 'estado']);

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

    Pelicula.findByIdAndUpdate(id, {estado: 'baja'}, {new: true, runValidators: true}, (err, peliculaBD) => {
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