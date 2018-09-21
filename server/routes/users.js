const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/user');
const { verificaToken, verificaRol } = require('../middlewares/autenticacion')

app.get('/usuario', verificaToken, (req, res) => {
    let condition = { estado: true };
    let desde = req.query.desde || 0;
    let limite = req.query.limite || 5;
    desde = Number(desde);
    limite = Number(limite);

    Usuario.count(condition, (err, count) => {
        Usuario.find(condition, 'nombre email role estado img google')
            .skip(desde)
            .limit(limite)
            .exec((err, result) => {
                if (err) {
                    return res.status(400).json({
                        err
                    });
                } else {
                    res.json({
                        ok: true,
                        usuarios: result,
                        count
                    })
                }
            });
    });
});

app.post('/usuario', [verificaToken, verificaRol], function(req, res) {
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

app.put('/usuario/:id', [verificaToken, verificaRol], function(req, res) {
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

app.delete('/usuario/:id', [verificaToken, verificaRol], function(req, res) {
    let id = req.params.id;
    let cambiaEstado = {
        estado: false
    }

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuario) => {
        if (err) {
            return res.status(400).json({
                err
            });
        } else {
            res.json({
                ok: true,
                usuario
            })
        }
    });

    // Usuario.findByIdAndRemove(id, (err, usuario) => {
    //     if (err) {
    //         return res.status(400).json({
    //             err
    //         });
    //     } else {
    //         res.json({
    //             ok: true,
    //             usuario
    //         })
    //     }
    // });
});

module.exports = app;