const express = require('express');
const app = express();

//using replit to run app and pass tests
//this file is just to show the code
const cors = require('cors');

app.use(express.static('public'));


//my replit for rest test file
//https://boilerplate-project-headerparser.aerinkayne.repl.co
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
  });

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
    res.json({greeting: 'hello API'});
});

//FCC API and microservices 2.  get info from req.headers
app.get('/api/whoami', (req, res) => {
    const ipaddress = req.headers['x-forwarded-for'];
    const language = req.headers['accept-language'];
    const software = req.headers['user-agent'];
    res.json({ipaddress, language, software})
  })
  
/*
req.headers
{
host: 'boilerplate-project-headerparser.aerinkayne.repl.co',
'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:88.0) Gecko/20100101 Firefox/88.0',
accept: '/*',
'accept-encoding': 'gzip, deflate, br',
'accept-language': 'en-US,en;q=0.5',
'if-none-match': 'W/"1c-sYBEh06RCmh94wMnsodz1YWX75M"',
origin: 'https://www.freecodecamp.org',
referer: 'https://www.freecodecamp.org/',
te: 'trailers',
'x-forwarded-for': '35.191.3.104',
'x-forwarded-proto': 'https',
'x-replit-user-id': '',
'x-replit-user-name': '',
'x-replit-user-roles': ''
}
*/