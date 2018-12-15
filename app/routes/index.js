const app = module.exports = require('express')();

app.use('/webhook', require('./messenger'));
app.use('/reservation', require('./reservations'));
app.use('/api', require('./graphql'));