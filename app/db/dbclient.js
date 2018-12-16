const pgPromise = require('pg-promise');

const connection = 'postgres://localhost:5432/nikhilkulkarni';
const pgp = pgPromise({});
const psql = pgp(connection);

const fetchReservation = (phoneNumber) => {
    const query = 'select * from reservations where phone_number = $1';
    return psql.one({
        text: query,
        values: [phoneNumber]
    });
};

const fetchSession = (phoneNumber) => {
    const query = 'select * from sessions where phone_number = $1';
    return psql.any({
        text: query,
        values: [phoneNumber]
    });
};

module.exports = {
    fetchReservation,
    fetchSession
};