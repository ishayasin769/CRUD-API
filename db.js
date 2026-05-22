const { Pool } = require('pg');

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "myTask",
    password: "admin",
    port: 5432
});

pool.connect()
    .then(() => console.log("Database Connected"))
    .catch(err => console.log(err));

module.exports = pool;