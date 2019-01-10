module.exports = app => {

  app.get('/api/charge', (req, res) => {


    var request = require("request");
    var endpoint = 'https://api.strike.acinq.co';
    var api_key = `${process.env.REACT_APP_API_KEY}`;

    var options = {
      method: 'POST',
      url: endpoint + '/api/v1/charges',
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json'
      },
      body: {
        amount: 1000,
        description: 'lightning charge',
        currency: 'btc'
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


  app.get('/api/charge/:id', (req, res) => {


    var request = require("request");
    var endpoint = 'https://api.strike.acinq.co';
    var api_key = `${process.env.REACT_APP_API_KEY}`;
    var charge_id = req.params.id

    var options = {
      method: 'POST',
      url: endpoint + '/api/v1/charges' + charge_id,
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json'
      },
      body: {
        amount: 1,
        description: 'lightning charge',
        currency: 'btc'
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
      res.send(response.body.id)
    })
  })


}

