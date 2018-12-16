const createReservation = (data) => {
    if (data == null) {
        return null;
    }

    return {
        id: data.id,
        hotelId: data.hotel_id,
        phoneNumber: data.phone_number,
        name: data.name,
        roomNumber: data.room_number,
        startDate: data.start_date,
        endDate: data.end_date,
        checkedIn: data.checked_in
    };
};

const createSession = (data) => {
    if (data == null) {
        return null;
    }

    return {
        id: data.id,
        phoneNumber: data.phone_number,
        fbId: data.fb_id,
        active: data.active
    };
};

module.exports = {
    createReservation,
    createSession
};