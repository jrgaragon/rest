const jwt = require('jsonwebtoken');

let verificaToken = (req, res, next) => {

    let token = req.get('Authorization');

    jwt.verify(token, process.env.TOKEN_SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }

        req.usuaio = decoded.usuario;
        next();
    });
}

let verificaRol = (req, res, next) => {
    let usuario = req.usuaio;

    console.log(usuario);
    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.status(401).json({
            ok: false,
            err: {
                message: 'No Admin'
            }
        });
    }
}

module.exports = {
    verificaToken,
    verificaRol
}