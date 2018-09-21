process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDatabase;

if (process.env.NODE_ENV === 'dev') {
    urlDatabase = 'mongodb://localhost:27017/cafe'
} else {
    urlDatabase = 'proddatabase';
}

process.env.URLDB = urlDatabase;

process.env.EXPIRATION_DATE = 60 * 60 * 24 * 30;

process.env.TOKEN_SEED = process.env.TOKEN_SEED || 'este-es-el-seed-desarrollo';