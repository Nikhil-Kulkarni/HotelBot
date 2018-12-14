const client = require('./dbclient');

const fetchReservation = (platform, phoneNumber) => {
    const query = 'SELECT * from RESERVATIONS where phone_number = $1';
    const rows = client.queryDb(query, [phoneNumber]);
    console.log(rows);
};

const fetchSession = (platform, phoneNumber, fbId) => {

};

module.exports = {
    fetchReservation,
    fetchSession,
};