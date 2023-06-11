const config = require('better-sqlite3')('C:/Users/Famille/OneDrive/Documents/cours informatique  de gestion 1 année/quad 2/javascript/projet web/base de donnée projet web/projet_web.db', { verbose: console.log });
const dbPath = config.dbPath;

// TODO export your database object & create your models

module.exports = config;