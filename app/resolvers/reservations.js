const db = require('../actions/dbclient').db;

const reservationsResolver = {
    Query: {
        reservations(_, args, ctx) {
            const query = 'select id, hotel_id, phone_number, name, room_number, checked_in from reservations';
            console.log(query);
            console.log(db.manyOrNone(query));
            return db.manyOrNone(query);
        }
    }
};

module.exports = {
    resolver: reservationsResolver
};
