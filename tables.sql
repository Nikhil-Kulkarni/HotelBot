/* Reservations table keeps track of minimal guest information needed for bot services */
/* For more detailed reservation information, query the hotel's CRM */
CREATE TABLE RESERVATIONS(
    ID              INT         PRIMARY KEY     NOT NULL,
    HOTEL_ID        TEXT        NOT NULL        UNIQUE,
    PHONE_NUMBER    TEXT        NOT NULL        UNIQUE,
    NAME            TEXT        NOT NULL,
    ROOM_NUMBER     INT,       /* To be filled in after querying CRM */
    START_DATE      TIMESTAMP, /* To be filled in after querying CRM */
    END_DATE        TIMESTAMP, /* To be filled in after querying CRM */
    CHECKED_IN      BOOLEAN     NOT NULL        DEFAULT FALSE
);

/* Sessions table keeps track of messaging session with user */
/* An entry for a phone number will exist here after user has checked in */
/* An entry for a phone number is marked inactive after user checks out */
/* We want to save session rows for analytics */ 
CREATE TABLE SESSIONS(
    ID              INT         PRIMARY KEY     NOT NULL,
    PHONE_NUMBER    TEXT        NOT NULL        UNIQUE          REFERENCES RESERVATIONS(PHONE_NUMBER),
    FB_ID           TEXT        UNIQUE,
    ACTIVE          BOOLEAN     DEFAULT TRUE
);