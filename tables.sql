/* Reservations table keeps track of minimal guest information needed for bot services */
/* For more detailed reservation information, query the hotel's CRM */
CREATE TABLE RESERVATIONS(
    ID              INT         PRIMARY KEY     NOT NULL,
    HOTEL_ID        TEXT        NOT NULL        UNIQUE,
    PHONE_NUMBER    TEXT        NOT NULL        UNIQUE,
    NAME            TEXT        NOT NULL,
    ROOM_NUMBER     INT,
    START_DATE      TIMESTAMP,
    END_DATE        TIMESTAMP,
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

/* Hotel table keep track of hotel metadata */
/* Ideally would query into this table with intent value */
CREATE TABLE HOTEL(
    ID              TEXT        PRIMARY KEY     NOT NULL,
    NAME            TEXT        NOT NULL,
    WIFI_PASSWORD   TEXT,
    CHECK_OUT_TIME  TEXT        NOT NULL,
    BREAKFAST_TIME  TEXT,
    GYM_HOURS       TEXT,
    POOL_HOURS      TEXT
);

/* Actions keeps track of guest requests */
/* Mark as complete after request has been completed and save for analytics */
CREATE TABLE ACTIONS(
    ID              TEXT         PRIMARY KEY     NOT NULL,
    RESERVATION_ID  INT        NOT NULL        REFERENCES RESERVATIONS(ID),
    ITEM            TEXT        NOT NULL,
    AMOUNT          INT,
    COMPLETE        BOOLEAN     NOT NULL        DEFAULT FALSE
);

/* Keeps track of hotels that use concierge frontend service */
CREATE TABLE USERS(
    ID              TEXT        PRIMARY KEY     NOT NULL,
    USERNAME        TEXT        NOT NULL        UNIQUE,
    PASSWORD        TEXT        NOT NULL
);