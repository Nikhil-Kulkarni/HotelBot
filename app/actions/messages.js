const dummyMessage = {
    text: 'This is a dummy response'
};

const connectWithAgentMessage =  {
    text: 'Hold on, I\'m connecting you to an agent.'
}

const sendPhoneNumberMessage =  {
    text: 'Hi there! I don\'t have an open reservation for you. Can you send me your phone number?'
}

const messageWithText = (messageText) => {
    return {
        text: messageText
    };
};

module.exports = {
    dummyMessage,
    messageWithText,
    connectWithAgentMessage,
    sendPhoneNumberMessage,
};