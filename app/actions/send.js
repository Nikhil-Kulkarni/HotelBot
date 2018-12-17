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
        markSeen(recipientId),
        typingOn(recipientId),
        ...messagePayloadArray]);
};

const sendDummyMessage = (recipientId) => {
    sendMessage(
        recipientId,
        [messages.dummyMessage]);
};

const sendGetPhoneNumberMessage = (recipientId) => {
    sendMessage(
        recipientId,
        [messages.sendPhoneNumberMessage]);
};

const sendPhoneNumberConfirmationMessage = (recipientId) => {
    sendMessage(
        recipientId,
        [messages.messageWithText('Thanks! Let me look up your reservation.')]);
};

const sendNoReservationMessage = (recipientId) => {
    sendMessage(
        recipientId,
        [messages.messageWithText('I\'m sorry. I don\'t see a reservation for you. Let me connect you to an agent.')]);
};

const sendBasicReservationInformation = (recipientId, personName, hotelName, startDate, endDate) => {
    sendMessage(
        recipientId,
        [messages.messageWithText(`Ok ${personName}, You're scheduled to stay at ${hotelName} from ${startDate} to ${endDate}`),
            messages.messageWithText('Feel free to ask me anything about your stay!')]);
};

const sendConnectToAgentMessage = (recipientId) => {
    sendMessage(
        recipientId,
        [messages.messageWithText('One moment. Let me connect you to an agent.')]);
};

const sendActionConfirmationMessage = (recipientId, item, amount)  => {
    var message = `Sure thing. We'll send you your ${item} shortly`;
    if (amount != -1) {
        message = `Sure thing. We'll send you your ${amount} ${item} shortly`
    }

    sendMessage(
        recipientId, 
        messages.messageWithText(message));
}

const sendGeneralInfoMessageWithText = (recipientId, text) => {
    sendMessage(
        recipientId,
        [messages.messageWithText(text)]);
}

module.exports = {
    sendMessage,
    sendDummyMessage,
    sendGetPhoneNumberMessage,
    sendPhoneNumberConfirmationMessage,
    sendNoReservationMessage,
    sendBasicReservationInformation,
    sendConnectToAgentMessage,
    sendActionConfirmationMessage,
    sendGeneralInfoMessageWithText
};