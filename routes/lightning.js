
module.exports = app => { 
var request = require("request");
var endpoint = 'https://api.dev.strike.acinq.co';
var api_key = `${process.env.REACT_APP_API_KEY}`;

var options = {
  method: 'POST',
  url: endpoint + '/api/v1/charges',
  headers: {
    'cache-control': 'no-cache',
    'Content-Type': 'application/json' },
  body: {
    amount: .000001,
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
  console.log(api_key)
  console.log(`Response is: ${JSON.stringify(response)}`)
  if (error) throw new Error(error);
  console.log(`Error is: ${error}
  Body is ${JSON.stringify(body)}`);

  })

}