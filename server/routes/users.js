const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/user');

app.get('/usuario', function(req, res) {
    res.json('get user')
});

app.post('/usuario', function(req, res) {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, dbUser) => {
        if (err) {
            return res.status(400).json({
                err
            });
        }
        res.json({
            ok: true,
            user: dbUser
        });
    });
});

app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, dbUser) => {
        if (err) {
            return res.status(400).json({
                err
            });
        }

        res.json({
            ok: true,
            user: dbUser
        });
    });
});

app.delete('/usuario', function(req, res) {
    res.json('delete user')
});

module.exports = app;