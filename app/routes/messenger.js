const app = module.exports = require('express')();
const receiveApi = require('../actions/receive');

// Messenger platform sends all webhook events to this post endpoint
app.post('/', (req, res) => {
    res.sendStatus(200);

    const body = req.body;
    if (body.object === 'page') {
        body.entry.forEach(entry => {
            entry.messaging.forEach(messagingEvent => {
                if (messagingEvent.message) {
                    receiveApi.handleReceivedMessage(messagingEvent);
                }
            });
        });
    } else {
        res.sendStatus(404)
    }
});

// Messenger platform verifies webook via this get endpoint
app.get('/', (req, res) => {
    let verifyToken = "nikhil";

    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === verifyToken) {
            console.log('webhook verified');
            res.status(200).send(challenge);
        }  else {
            res.sendStatus(403); 
        }
    } else {
        res.sendStatus(403); 
    }
});