module.exports = {
    confirmCharge: (req, res) => {
        var request = require("request");

        var endpoint = 'https://api.dev.strike.acinq.co';
        var api_key = `${process.env.REACT_APP_API_KEY}`;
        // var charge_id = { params: req.charge_id }

        var options = {
            method: 'GET', 
            url: endpoint + '/api/v1/charges/' + req.params.charge_id,
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
            console.log(options, url, req.params.id)
            console.log(`THIS WORKED. Response is: ${JSON.stringify(response)}`)
            if (error) { throw new Error(error) };
            console.log(`Error is: ${error}
      THIS WORKED. Body is ${JSON.stringify(body)}`);
            res.send(response)
        })

    }
}

