const pgPromise = require('pg-promise');

const connection = process.env.DATABASE_URL;
const pgp = pgPromise({});
const psql = pgp(connection);

module.exports = {
    db: psql
};