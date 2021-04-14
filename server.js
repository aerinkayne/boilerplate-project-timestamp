// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
app.use(express.json());

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));


// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});



// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.status(200).json({greeting: 'hello API'});
});
app.get('/api/timestamp/', (req, res) => {
  //returns milliseconds
  const dNow = Date.now();
  const date = new Date();
  const utc = date.toUTCString();
  res.status(200).json({unix: dNow, utc});
});
app.get('/api/timestamp/:timeString', (req, res) => {

  const regexFormat1 = new RegExp(/^\d{0,16}$/); 
  const regexFormat2 = new RegExp(/^\d{4}\-\d{2}\-\d{2}$/);
  let time = req.params.timeString;
  if (regexFormat1.test(time)){
    //story for project uses millis
    const unix = parseInt(time);
    const utc = new Date(unix).toUTCString();
    return res.status(200).json({unix, utc});
  }
  else if (regexFormat2.test(time)){
    let arrTime = time.split('-');
    arrTime[1] -= 1;  //get JS day.  str-num will work
    const date = new Date(...arrTime);
    const utc = date.toUTCString();
    const unix = date.getTime();
    return res.status(200).json({unix, utc});
  }
  else {
    return res.status(400).json({message: "please enter a valid date format: YYYY-MM-DD or #milliseconds (less than 17 digits)"});
  }
});


// listen for requests :)
const {PORT=3000} = process.env;
var listener = app.listen(PORT, function () { //
  console.log('Your app is listening on port ' + listener.address().port);
});
