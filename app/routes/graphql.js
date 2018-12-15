const app = require('express')();
const graphqlExpress = require('graphql-server-express').graphqlExpress;
const graphiqlExpress = require('graphql-server-express').graphiqlExpress;
const schema = require('../schemas/reservations').schema;
const db = require('../actions/dbclient').db;

app.use('/graphiql', graphiqlExpress({
    endpointURL: '/api',
}));

app.get('/testdb', (req, res) => {
    const rows = db.manyOrNone('select * from reservations');
    res.status(200).send(rows);
});
app.use('/', graphqlExpress({ schema }));

module.exports = app;