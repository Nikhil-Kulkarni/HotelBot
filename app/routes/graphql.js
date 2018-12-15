const app = require('express')();
const graphqlExpress = require('graphql-server-express').graphqlExpress;
const graphiqlExpress = require('graphql-server-express').graphiqlExpress;
const schema = require('../schemas/reservations').schema;
const db = require('../actions/dbclient').db;

app.use('/graphiql', graphiqlExpress({
    endpointURL: '/api',
}));
app.use('/', graphqlExpress({ schema }));

module.exports = app;