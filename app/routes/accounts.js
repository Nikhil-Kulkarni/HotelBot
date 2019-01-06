const app = module.exports = require('express')();
const { isEmpty } = require('lodash');
const { fetchHotelById } = require('../db/dbclient');

app.post('/login', (req, res) => {
    const body = req.body;
    if (!body || !body.hotelId) {
        res.sendStatus(400);
    }

    const hotelId = body.hotelId;
    fetchHotelById(hotelId)
        .then((data) => {
            if (isEmpty(data)) {
                const body = {
                    'message': 'Invalid hotel ID'
                };
                res.status(400).send(body);
            }
            res.status(200).send(data[0]);
        });

});

