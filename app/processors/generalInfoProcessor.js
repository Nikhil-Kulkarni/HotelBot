const { isEmpty } = require('lodash');
const { sendGeneralInfoMessageWithText, sendConnectToAgentMessage } = require('../actions/send');
const { 
    fetchCheckoutTimeFromHotelId,
    fetchBreakfastHoursFromHotelId,
    fetchPoolHoursFromHotelId,
    fetchGymHoursFromHotelId,
    fetchWifiPasswordFromHotelHotelId, 
    fetchReservationFromPhoneNumber 
} = require('../db/dbclient');

const process = (senderId, entities, phoneNumber) => {
    if (isEmpty(entities)) {
        sendConnectToAgentMessage(senderId);
        return;
    }

    fetchReservationFromPhoneNumber(phoneNumber)
        .then((data) => {
            const hotelId = data.hotel_id;
            if (entities.wifi) {
                fetchAndSendWifiPassword(senderId, hotelId);
            } else if (entities.breakfast) {
                fetchAndSendBreakfast(senderId, hotelId);
            } else if (entities.checkout) {
                fetchAndSendCheckout(senderId, hotelId);
            } else if (entities.gymHours) {
                fetchAndSendGymHours(senderId, hotelId);
            } else if (entities.poolHours) {
                fetchAndSendPoolHours(senderId, hotelId);
            }
        });
};

const fetchAndSendWifiPassword = (senderId, hotelId) => {
    fetchWifiPasswordFromHotelHotelId(hotelId)
        .then((data) => {
            const wifiPassword = data.wifi_password;
            const message = `The wifi password is ${wifiPassword}`;
            sendGeneralInfoMessageWithText(senderId, message);
        });
};

const fetchAndSendBreakfast = (senderId, hotelId) => {
    fetchBreakfastHoursFromHotelId(hotelId)
        .then((data) => {
            const breakfastHours = data.breakfast_time;
            const message = `Breakfast is from ${breakfastHours}`;
            sendGeneralInfoMessageWithText(senderId, message);
        });
};

const fetchAndSendCheckout = (senderId, hotelId) => {
    fetchCheckoutTimeFromHotelId(hotelId)
        .then((data) => {
            const checkoutHours = data.check_out_time;
            const message = `Checkout is by ${checkoutHours}`;
            sendGeneralInfoMessageWithText(senderId, message);
        });
};

const fetchAndSendGymHours = (senderId, hotelId) => {
    fetchGymHoursFromHotelId(hotelId)
        .then((data) => {
            const gymHours = data.gym_hours;
            const message = `The gym is open from ${gymHours}`;
            sendGeneralInfoMessageWithText(senderId, message);
        });
};

const fetchAndSendPoolHours = (senderId, hotelId) => {
    fetchPoolHoursFromHotelId(hotelId)
        .then((data) => {
            const poolHours = data.pool_hours;
            const message = `The pool is open from ${poolHours}`;
            sendGeneralInfoMessageWithText(senderId, message);
        });
};

module.exports = {
    process,
};