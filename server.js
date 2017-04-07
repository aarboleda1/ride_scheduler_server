var express = require('express');
var app = express();

var schedule = require('node-schedule');
var fetch = require('node-fetch');
var pat = require('path');
var keys = require('./keys.js');



/*
  Cron in order to which should scrape exisitng rides that will be scheduled 
*/

var cron = schedule.scheduleJob('39 * * * * *', function() {
  var url = `https://api.lyft.com/oauth/authorize?client_id=${keys.clientId}cope=public%20profile%20rides.read%20rides.request%20offline&state=<state_string>&response_type=code`;
  console.log(keys.clientId);
  fetch(url)
  .then(res => res.json())
  .then(json => console.log(json));
});

app
  .get( '/', function( req, res ) {
    res.sendFile( pat.join( __dirname, 'index.html' ));
  });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});