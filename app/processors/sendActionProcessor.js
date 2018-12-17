const { isEmpty } = require('lodash');
const sendApi = require('../actions/send');
const { insertAction, fetchReservationFromPhoneNumber } = require('../db/dbclient');

const process = (senderId, entities, phoneNumber) => {
    if (!entities.item) {
        sendApi.sendConnectToAgentMessage(senderId);
        return;
    }

    const item = entities.item[0].value;
    if (!isEmpty(entities.number)) {
        const amount = entities.number[0].value;
        createItem(senderId, phoneNumber, item, amount);
    } else {
        createItem(senderId, phoneNumber, item, -1);
    }
};

const createItem = (senderId, phoneNumber, item, amount) => {
    fetchReservationFromPhoneNumber(phoneNumber)
        .then((data) => {
            const reservationId = data.id;
            insertAction(reservationId, item, amount)
                .then((data) => {
                    sendApi.sendActionConfirmationMessage(senderId, item, amount);
                });
        });
};

module.exports = {
    process,
};