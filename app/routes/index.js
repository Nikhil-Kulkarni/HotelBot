const app = module.exports = require('express')();

app.use('/webhook', require('./messenger'));
app.use('/account', require('./accounts'));