const app = module.exports = require('express')();

app.use('/webhook', require('./messenger'));