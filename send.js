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

const sendMessageFromText = (recipientId, message) => {
    const text = message.text.toLowerCase();
    if (text.includes("hi") || text.includes("hey") || text.includes("yo") || text.includes("What's up")) {
        sendMessage(
            recipientId,
            [messages.messageWithText("Hi, I'm Chef Nikhil. I look up recipes for food you want, gather the ingredients, and deliver them right to your doorstep. Tell me what you want to eat and I'll figure the rest out."),
            messages.messageWithText("Try asking me for some tacos")]);
            return;
    }

    if (text.includes("taco") || text.includes("tacos")) {
        sendMessage(
            recipientId,
            [messages.messageWithText("To make tacos, you need:"), 
            messages.messageWithText("Shredded cheese \nDiced tomatoes \nMinced red onion \nJalapenos \nSour cream \nGuacamole \nOlives \nShredded lettuce \nCilantro \nDiced avocado"),
            messages.messageWithText("Your total is $13.78. Should I go ahead and buy ingredients for your tacos?")]);
            return;
    }

    if (text.includes("yes")) {
        sendMessage(
            recipientId,
            [messages.messageWithText("Great!"), 
            messages.messageWithText("Your ingredients will arrive at 1431 Ocean Ave, Santa Monica, CA in 30 minutes."),
            messages.messageWithText("Once your ingredients arrive, I'll walk you through the cooking process. Just let me know!")]);
    }
};

const sendDummyMessage = (recipientId) => {
    sendMessage(
        recipientId,
        [messages.dummyMessage]);
};

module.exports = {
    sendMessage,
    sendDummyMessage,
    sendMessageFromText
};