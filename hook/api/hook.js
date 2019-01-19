const router = require('express').Router()
// const hookController = require('../../controllers/hookController')

router.route('/:id', (req, res) => {
    var request = require("request");

    var endpoint = 'https://api.dev.strike.acinq.co';
    var api_key = `${process.env.REACT_APP_API_KEY}`;
    var charge_id = {params: req.charge_id};

    var options = {
        method: 'GET',
        url: endpoint + '/api/v1/charges/' + charge_id,
        headers: {
            'cache-control': 'no-cache',
            'Content-Type': 'application/json'
        },
        json: true,
        auth: {
            user: api_key,
            pass: '',
        }
    };

    request(options, function (error, response, body) {
        console.log(`Response is: ${JSON.stringify(response)}`)
        if (error) { throw new Error(error) };
        console.log(`Error is: ${error}
  Body is ${JSON.stringify(body)}`);
        res.send(response)
    })

})

module.exports = router;