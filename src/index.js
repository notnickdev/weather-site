const express = require('express');
const hbs = require('hbs');
const path = require('path');

const app = express();
const port = 3000 || process.env.PORT;

// Files
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

// Paths
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Sets the view engine
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Serves static directory
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    htmlTitle: 'Weather',
    title: 'Weather Application',
    name: 'Nicholas',
  });
});

app.use('/about', (req, res) => {
  res.render('about', {
    htmlTitle: 'About',
    title: 'About Page',
    name: 'Nicholas',
  });
});

app.use('/help', (req, res) => {
  res.render('help', {
    htmlTitle: 'Help',
    title: 'Help Page',
    message: 'Please contact staff for help',
    name: 'Nicholas',
  });
});

app.get('/weather', (req, res) => {
  const address = req.query.address;

  if (!address) {
    return res.status(400).send({
      error: 'Please provide an address',
    });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error)
      return res.status(400).send({
        error,
      });

    forecast(latitude, longitude, (error, forecastData) => {
      if (error)
        return res.status(400).send({
          error,
        });

      res.status(200).send({
        forecast: forecastData,
        location,
        address,
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.status(404).render('404', {
    htmlTitle: 'Help / ?',
    title: 'Help page error',
    message: 'Help article not found.',
    name: 'Nicholas',
  });
});

app.get('*', (req, res) => {
  res.status(404).render('404', {
    htmlTitle: '404 / ?',
    title: 'Page Not Found.',
    message: 'Page not found',
    name: 'Nicholas',
  });
});

app.listen(port, () => console.log(`Listening on port: ${port}`));
