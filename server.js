const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const routes = require('./routes')
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on her

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  require('dotenv').config()
  app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  })

  // app.get('/:id', (request, response) => {
  //   response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  // })

  app.post('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  })

}

app.use(routes)

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
