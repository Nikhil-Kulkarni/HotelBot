const sendApi = require('./send');
const { isEmpty } = require('lodash');
const { fetchSessionFromFbId, createSession, fetchReservationFromPhoneNumber, fetchHotelInfoFromReservationId } = require('../db/dbclient');
const sendActionProcessor = require('../processors/sendActionProcessor');
const generalInfoProcessor = require('../processors/generalInfoProcessor');
const processorMap = {
    "sendAction" :  sendActionProcessor,
    "generalInfo" : generalInfoProcessor,
};

const handleReceivedMessage = (messagingEvent) => {
    const message = messagingEvent.message.text;
    const entities = messagingEvent.message.nlp.entities;
    const senderId = messagingEvent.sender.id;

    if (message.startsWith("+1")) {
        createNewSession(senderId, message);
        return;
    }

    checkSession(senderId, entities);
};

const checkSession = (senderId, entities) => {
    fetchSessionFromFbId(senderId)
        .then((data) => {
            if (isEmpty(data)) {
                sendApi.sendGetPhoneNumberMessage(senderId);
                return;
            } else {
                processNlp(senderId, entities, data[0].phone_number);
            }
        });
};

const processNlp = (senderId, entities, phoneNumber) => {
    if (isEmpty(entities) || isEmpty(entities.intent)) {
        sendApi.sendConnectToAgentMessage(senderId);
        return;
    }

    const intentValue = entities.intent[0].value;
    const processor = processorMap[intentValue];
    processor.process(senderId, entities, phoneNumber);
}

const createNewSession = (senderId, phoneNumber) => {
    createSession(phoneNumber, senderId)
        .then((data) => {
            fetchReservationFromPhoneNumber(phoneNumber)
                .then((data) => {
                    const reservationId = data.id;
                    if (!reservatisonId) {
                        sendApi.sendNoReservationMessage(senderId);
                    } else {
                        getAndSendHotelInfo(senderId, reservationId);
                    }
                });
            return;
        });
};

const getAndSendHotelInfo = (senderId, reservationId) => {
    fetchHotelInfoFromReservationId(reservationId)
        .then((data) => {
            const hotelName = data.hotel_name;
            const personName = data.name;
            const startDate = data.start_date;
            const end_date = data.end_date;

            sendApi.sendBasicReservationInformation(senderId, personName, hotelName, startDate, end_date);
        })
}

module.exports = {
    handleReceivedMessage,
};