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
  var url = `https://api.lyft.com/oauth/authorize?client_id=${keys.clientId}scope=public%20profile%20rides.read%20rides.request%20offline&state=<state_string>&response_type=code`;
  console.log(keys.clientId);
  fetch(url)
  .then(res => res.json())
  .then(json => console.log(json));
});

/*This code redirects the user upon login to allow the application access to user credentials*/
app
  .get( '/login', function( req, res ) {
    var url = 'https://api.lyft.com/oauth/authorize?client_id=kK1f4CSvQe4r&scope=public%20profile%20rides.read%20rides.request%20offline&state=<state_string>&response_type=code';
    fetch(url)
      .then((response) => {
        res.redirect(response.url);
      });
  });


app
  .get( '/', function( req, res ) {
    // res.sendFile( pat.join( __dirname, 'index.html' ));
    res.send(200);
  });

app.listen(3000, function () {
  console.log('Ride-scheduling-app-server app listening on port 3000!');
});