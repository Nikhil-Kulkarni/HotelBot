const _ = require('lodash');
const request = require('request');

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

const callApi = (endpoint, messageDataArray, queryParams = {}, retries = 5) => {
    if (!endpoint) {
        console.error('You must submit an endpoint');
        return;
    }

    if (!PAGE_ACCESS_TOKEN) {
        console.error('Missing access token');
        return;
    }

    if (retries < 0) {
        console.error('No retries left', {endpoint, messageDataArray, queryParams});
        return;
    }

    const query = Object.assign({access_token: PAGE_ACCESS_TOKEN}, queryParams);
    const [messageToSend, ...queue] = _.castArray(messageDataArray);
    request({
        uri: `https://graph.facebook.com/v2.6/me/${endpoint}`,
        qs: query,
        method: 'POST',
        json: messageToSend,
    }, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            console.log(`Successfully send message to ${endpoint}`);
            if (!_.isEmpty(queue)) {
                callApi(endpoint, queue, queryParams);
            }
        } else {
            console.error(`Failed to call messenger api ${endpoint}`);
            console.error(`Retrying with ${retries} left`);
            callApi(endpoint, messageDataArray, queryParams, retries - 1);
        }
    });
};

const callMessagesApi = (messageDataArray, queryParams = {}) => {
    return callApi('messages', messageDataArray, queryParams);
};

module.exports = {
    callApi,
    callMessagesApi
};