const db = require('../actions/dbclient').db;

const reservationsResolver = {
    Query: {
        reservations(_, args, ctx) {
            const query = 'select * from reservations';
            return db.manyOrNone(query);
        }
    }
};

module.exports = {
    resolver: reservationsResolver
};
