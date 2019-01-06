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
};

const fetchHotelInfoFromReservationId = (reservationId) => {
    const query = 'select reservations.start_date, reservations.end_date, reservations.name, hotel.name as hotel_name from reservations, hotel where reservations.id = $1 and reservations.hotel_id = hotel.id';
    return psql.one({
        text: query,
        values: [reservationId]
    });
};

const fetchWifiPasswordFromHotelHotelId = (hotelId) => {
    const query = 'select wifi_password from hotel where id = $1'
    return psql.one({
        text: query,
        values: [hotelId]
    });
};

const fetchGymHoursFromHotelId = (hotelId) => {
    const query = 'select gym_hours from hotel where id = $1'
    return psql.one({
        text: query,
        values: [hotelId]
    });
};

const fetchPoolHoursFromHotelId = (hotelId) => {
    const query = 'select pool_hours from hotel where id = $1'
    return psql.one({
        text: query,
        values: [hotelId]
    });
};

const fetchBreakfastHoursFromHotelId = (hotelId) => {
    const query = 'select breakfast_time from hotel where id = $1'
    return psql.one({
        text: query,
        values: [hotelId]
    });
};

const fetchCheckoutTimeFromHotelId = (hotelId) => {
    const query = 'select check_out_time from hotel where id = $1'
    return psql.one({
        text: query,
        values: [hotelId]
    });
};

const insertAction = (reservationId, item, amount) => {
    const query = 'insert into actions values($1, $2, $3, $4, $5)';
    const uuid = uuidv4();
    return psql.none(query, [uuid, reservationId, item, amount, false]);
};

const createSession = (phoneNumber, fbId) => {
    const query = 'insert into sessions values($1, $2, $3, $4)';
    var id = new Date().getTime();
    id = id & 0xffffffff;
    return psql.none(query, [id, phoneNumber, fbId, true]);
};

const registerUser = (username, password) => {
    const query = 'insert into users values($1, $2, $3)';
    var id = new Date().getTime();
    id = id & 0xffffffff;
    return psql.none(query, [id, username, password]);
}

const fetchUser = (username, password) => {
    const query = 'select * from users where username= $1 and password = $2';
    return psql.any({
        text: query, 
        values: [username, password]
    });
}

const fetchUserById = (id) => {
    const query = 'select * from users where id = $1';
    return psql.one({
        text: query,
        values: [id]
    });
}

const fetchHotelById = (id) => {
    const query = 'select * from hotel where id = $1';
    return psql.any({
        text: query,
        values: [id]
    });
}

const fetchActionForHotelId = (hotelId) => {
    const query = `select actions.id, actions. reservation_id, actions.item, actions.amount, actions.complete, reservations.room_number, 
        reservations.name, reservations.phone_number from hotel, reservations, actions where hotel.id = reservations.hotel_id 
        and reservations.id = actions.reservation_id and reservations.hotel_id= $1`;
    return psql.any({
        text: query,
        values: [hotelId]
    });
}

module.exports = {
    fetchReservationFromPhoneNumber,
    fetchSessionFromPhoneNumber,
    fetchSessionFromFbId,
    fetchHotelInfoFromReservationId,
    fetchCheckoutTimeFromHotelId,
    fetchBreakfastHoursFromHotelId,
    fetchPoolHoursFromHotelId,
    fetchGymHoursFromHotelId,
    fetchWifiPasswordFromHotelHotelId,
    insertAction,
    createSession,
    registerUser,
    fetchUser,
    fetchUserById,
    fetchHotelById,
    fetchActionForHotelId
};