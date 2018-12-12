const dummyMessage = {
    text: 'This is a dummy response'
};

const messageWithText = (messageText) => {
    return {
        text: messageText
    };
};

module.exports = {
    dummyMessage,
    messageWithText
};