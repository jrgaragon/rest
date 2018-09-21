const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/user');
const jwt = require('jsonwebtoken');

app.post('/login', (req, res) => {
    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    messasge: '[Usuario] o contraseña incorrectos.'
                }
            });
        }

        if (!bcrypt.compareSync(body.password, userDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    messasge: 'Usuario o [contraseña] incorrectos.'
                }
            });
        }

        let token = jwt.sign({
            usuario: userDB
        }, process.env.TOKEN_SEED, { expiresIn: process.env.EXPIRATION_DATE });

        res.json({
            ok: true,
            usuario: userDB,
            token
        });

    });
});

module.exports = app;