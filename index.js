// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
const options = {
  weekday: 'short', // "Mon"
  year: 'numeric', // "2026"
  month: 'long',   // "January"
  day: 'numeric',   // "26"
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  timeZoneName: 'shortOffset' // e.g., GMT-5
};
const date = new Date()
const miliSeconds = date.getTime()
const unixTime = Math.floor(miliSeconds / 1000)
const formattedDateLocal = new Intl.DateTimeFormat(undefined, options).format(date);
console.log(unixTime);

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:date", (req, res) => {
  let date = req.params.date
  console.log(date)
  if (/\d{5,}/.test(date)) {
    let dateInt = parseInt(date)
    res.json({ "unix": date, "utc": new Date().toUTCString() })
  } else {
    let dateObj = new Date(date)
    if (dateObj === 'Invalid Date') {
      res.json({ Error: "Invalid Date" })
    } else {
      res.json({ "unix": dateObj.valueOf(), "utc": dateObj.toUTCString() })
    }
  }
})


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
