const app = module.exports = require('express')();


app.get('/test', (req, res) => {
    res.status(200).send('test success')
});