const app = module.exports = require('express')();
const { isEmpty } = require('lodash');
const { fetchHotelById, fetchActionForHotelId } = require('../db/dbclient');

app.post('/login', (req, res) => {
    const body = req.body;
    if (!body || !body.hotelId) {
        res.sendStatus(400);
        return;
    }

    const hotelId = body.hotelId;
    fetchHotelById(hotelId)
        .then((data) => {
            if (isEmpty(data)) {
                const body = {
                    'message': 'Invalid hotel ID'
                };
                res.status(400).send(body);
                return;
            }
            res.status(200).send(data[0]);
        });

});

app.post('/requests', (req, res) => {
    const body = req.body;
    if (!body || !body.hotelId) {
        res.sendStatus(400);
        return;
    }

    const hotelId = body.hotelId;
    fetchActionForHotelId(hotelId)
        .then((data) => {
            res.status(200).send(data);
        });
});