const app = module.exports = require('express')();
const queries = require('../actions/queries');

app.get('/test', (req, res) => {
    res.status(200).send(queries.fetchReservation('messenger', '+14048600194'));
});