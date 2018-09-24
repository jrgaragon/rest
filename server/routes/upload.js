const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

// default options
app.use(fileUpload());

app.put('/upload', function(req, res) {
    if (!req.files)
        return res.status(400).json({
            ok: true,
            err: {
                message: 'No files were uploaded.'
            }
        });

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let fileUploader = req.files.fileUploader;
    let extensiones = ['png', 'jpg'];
    let fileName = fileUploader.name.split('.');
    let extension = fileName[fileName.length - 1];

    if (extensiones.indexOf(extension) < 0) {
        return res.status(500).json({
            ok: false,
            err: {
                message: 'Extension no valida'
            }
        });
    }

    // Use the mv() method to place the file somewhere on your server
    fileUploader.mv('uploads/' + fileUploader.name, (err) => {
        if (err)
            return res.status(500).json({
                ok: false,
                err
            });

        res.json({
            ok: true,
            message: 'ok'
        });
    });
});

module.exports = app;