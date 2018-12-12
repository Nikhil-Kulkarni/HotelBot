const app = module.exports = require('express')();

app.get('/reservation', (req, res) => {
    res.status(200).send("DONE");
});