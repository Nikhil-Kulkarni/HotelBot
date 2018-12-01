const messages = require('./messages');
const api = require('./api');
const _ = require('lodash');

const typingOn = (recipientId) => {
    return {
        "recipient": {
            "id": recipientId,
        },
        "sender_action": "typing_on"
    }
}

const typingOff = (recipientId) => {
    return {
        "recipient": {
            "id": recipientId,
        },
        "sender_action": "typing_off"
    }
}

const markSeen = (recipientId) => {
    return {
        "recipient": {
            "id": recipientId,
        },
        "sender_action": "mark_seen"
    }
}

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

    api.callMessagesApi([
        typingOn(recipientId),
        ...messagePayloadArray]);
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