const messages = require('./messages');
const api = require('./api');
const _ = require('lodash');

const messageToJson = (recipientId, messagePayload) => {
    return {
        recipient: {
            id: recipientId,
        },
        message: messagePayload
    };
};

const sendMessage = (recipientId, messagePayloads) => {
    const messagePayloadArray = _.castArray(messagePayloads)
        .map((payload) => messageToJson(recipientId, payload));

    api.callMessagesApi(messagePayloadArray);
};

const sendDummyMessage = (recipientId) => {
    sendMessage(
        recipientId,
        [messages.dummyMessage]);
};

module.exports = {
    sendMessage,
    sendDummyMessage
};