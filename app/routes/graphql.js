const app = require('express')();
const graphQLExpress = require('graphql-server-express').graphqlExpress;
const graphIQLExpress = require('graphql-server-express').graphIQLExpress;
const schema = require('../schemas/reservations');

app.use('/graphiql', graphIQLExpress({
    endpointUrl: '/',
}));

app.use('/', graphQLExpress({ schema }));

module.exports = app;