const { Pool } = require("pg");
require("dotenv").config(); //untuk mambaca file .env

const pool = new Pool ({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pool.on("error", (err, client) => {
    console.error("Ada error tak terduga pada Database", err);
    process.exit(-1);
});

module.exports = pool;