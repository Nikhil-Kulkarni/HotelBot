const sendApi = require('./send');

const handleReceivedMessage = (messagingEvent) => {
    const message = messagingEvent.message;
    const senderId = messagingEvent.sender.id;

    sendApi.sendDummyMessage(senderId);
};

module.exports = {
    handleReceivedMessage,
};