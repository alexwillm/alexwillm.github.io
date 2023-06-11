// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();
require('dotenv').config({"path": 'settings.env'});

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get(["/api/:date", "/api/", "/api"], function (req, res) {
  let dateString = req.params.date;
  console.log(dateString)
  const responseBody = {};
  if(!dateString || dateString.match(/^\d+$/)) {
    const timestamp = parseInt(dateString) || Date.now();
    const date = new Date(timestamp);
    responseBody["unix"] = date.valueOf();
    responseBody["utc"] = date.toUTCString();
  } else if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
    const date = new Date(dateString);
    responseBody["unix"] = date.valueOf();
    responseBody["utc"] = date.toUTCString();
  } else {
    const date = Date.parse(dateString);
    if(!isNaN(date)) {
      const date = new Date(dateString);
      responseBody["unix"] = date.valueOf();
      responseBody["utc"] = date.toUTCString();
    } else {
      responseBody["error"] = "Invalid Date";
    }
  }
  console.log(responseBody)
  res.json(responseBody);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
