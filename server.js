'use strict';

require('dotenv').config();

const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

const Location = function(obj){
  this.search_query = obj.results[0].address_components[0].long_name;
  this.formatted_query = obj.results[0].formatted_address;
  this.latitude = obj.results[0].geometry.bounds.northeast.lat;
  this.longitude = obj.results[0].geometry.bounds.northeast.lng;
};

app.get('/location', (request, response) => {
  let geoData = require('./data/geo.json');
  const loc = new Location(geoData);
  response.send(loc);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
