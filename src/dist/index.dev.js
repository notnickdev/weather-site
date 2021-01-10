"use strict";

var express = require('express');

var hbs = require('hbs');

var path = require('path');

var app = express();
var port = 3000 || process.env.PORT; // Files

var forecast = require('./utils/forecast');

var geocode = require('./utils/geocode'); // Paths


var publicDirectoryPath = path.join(__dirname, '../public');
var viewsPath = path.join(__dirname, '../templates/views');
var partialsPath = path.join(__dirname, '../templates/partials'); // Sets the view engine

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath); // Serves static directory

app.use(express["static"](publicDirectoryPath));
app.get('', function (req, res) {
  res.render('index', {
    htmlTitle: 'Weather',
    title: 'Weather Application',
    name: 'Nicholas'
  });
});
app.use('/about', function (req, res) {
  res.render('about', {
    htmlTitle: 'About',
    title: 'About Page',
    name: 'Nicholas'
  });
});
app.use('/help', function (req, res) {
  res.render('help', {
    htmlTitle: 'Help',
    title: 'Help Page',
    message: 'Please contact staff for help',
    name: 'Nicholas'
  });
});
app.get('/weather', function (req, res) {
  var address = req.query.address;

  if (!address) {
    return res.status(400).send({
      error: 'Please provide an address'
    });
  }

  geocode(address, function (error) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        latitude = _ref.latitude,
        longitude = _ref.longitude,
        location = _ref.location;

    if (error) return res.status(400).send({
      error: error
    });
    forecast(latitude, longitude, function (error, forecastData) {
      if (error) return res.status(400).send({
        error: error
      });
      res.status(200).send({
        forecast: forecastData,
        location: location,
        address: address
      });
    });
  });
});
app.get('/help/*', function (req, res) {
  res.status(404).render('404', {
    htmlTitle: 'Help / ?',
    title: 'Help page error',
    message: 'Help article not found.',
    name: 'Nicholas'
  });
});
app.get('*', function (req, res) {
  res.status(404).render('404', {
    htmlTitle: '404 / ?',
    title: 'Page Not Found.',
    message: 'Page not found',
    name: 'Nicholas'
  });
});
app.listen(port, function () {
  return console.log("Listening on port: ".concat(port));
});