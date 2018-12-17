const pgPromise = require('pg-promise');
const uuidv4 = require('uuid/v4');
require('dotenv').config();

const connection = process.env.DATABASE_URL;
const pgp = pgPromise({});
const psql = pgp(connection);

const fetchReservationFromPhoneNumber = (phoneNumber) => {
    const query = 'select * from reservations where phone_number = $1';
    return psql.one({
        text: query,
        values: [phoneNumber]
    });
};

const fetchSessionFromPhoneNumber = (phoneNumber) => {
    const query = 'select * from sessions where phone_number = $1';
    return psql.any({
        text: query,
        values: [phoneNumber]
    });
};

const fetchSessionFromFbId = (fbId) => {
    const query = 'select * from sessions where fb_id = $1';
    return psql.any({
        text: query,
        values: [fbId]
    });
}

const fetchHotelInfoFromReservationId = (reservationId) => {
    const query = 'select reservations.start_date, reservations.end_date, reservations.name, hotel.name as hotel_name from reservations, hotel where reservations.id = $1 and reservations.hotel_id = hotel.id';
    return psql.one({
        text: query,
        values: [reservationId]
    });
}

const insertAction = (reservationId, item, amount) => {
    const query = 'insert into actions values($1, $2, $3, $4, $5)';
    const uuid = uuidv4();
    return psql.none(query, [uuid, reservationId, item, amount, false]);
}

const createSession = (phoneNumber, fbId) => {
    const query = 'insert into sessions values($1, $2, $3, $4)';
    var id = new Date().getTime();
    id = id & 0xffffffff;
    return psql.none(query, [id, phoneNumber, fbId, true]);
}

module.exports = {
    fetchReservationFromPhoneNumber,
    fetchSessionFromPhoneNumber,
    fetchSessionFromFbId,
    fetchHotelInfoFromReservationId,
    insertAction,
    createSession
};