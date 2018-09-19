require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

app.use(require('./routes/users'));

mongoose.connect('mongodb://localhost:27017/cafe', { useNewUrlParser: true }, (err) => {
    if (err) {
        throw err;
    } else {
        console.log('DB Connected');
    }
});

app.listen(process.env.PORT, () => {
    console.log('escuchando', process.env.PORT);
});