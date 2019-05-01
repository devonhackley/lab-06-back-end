'use strict';

require('dotenv').config();

const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;
const weatherArr = [];

const Location = function(obj){
  this.search_query = obj.results[0].address_components[0].long_name;
  this.formatted_query = obj.results[0].formatted_address;
  this.latitude = obj.results[0].geometry.location.lat;
  this.longitude = obj.results[0].geometry.location.lng;
};

const Weather = function(obj) {
  this.forecast = obj.summary;
  this.time = new Date(obj.time * 1000).toString().slice(0, 15);
  weatherArr.push(this);
};
const handleErrors = function(res) {
  res.status(500).send('Sorry something went wrong!');
};
app.get('/location', (request, response) => {
  try {
    let geoData = require('./data/geo.json');
    const loc = new Location(geoData);
    response.send(loc);
  } catch(e) {
    handleErrors(response);
  }
});

app.get('/weather', (request, response) => {
  try {
    let weatherData = require('./data/darksky.json');
    weatherData.daily.data.forEach(element => {
      new Weather(element);
    });
    response.send(weatherArr);
  } catch(e) {
    handleErrors(response);
  }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
