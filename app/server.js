const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/index');
const app = module.exports = express().use(bodyParser.json());

// Enable cors
app.use(cors());

app.use(bodyParser.json());

// Mount the routes
app.use(routes);

app.listen(process.env.PORT || 1337, () => console.log("webhook is listening"));
