const request = require('postman-request');

require('dotenv').config();

const forecast = (latitide, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${process.env.API_KEY}&query=${latitide},${longitude}&units=f`;

  request({ url, json: true }, (error, response, { current, success }) => {
    if (error) {
      callback('Unable to connect to weather services.', undefined);
    } else if (success === false) {
      callback(
        'Please specify a valid location identifier using the query parameter.',
        undefined
      );
    } else {
      callback(
        undefined,
        `${current.weather_descriptions[0]}. It is currently ${current.temperature} degress out. It feels like ${current.feelslike} degress out`
      );
    }
  });
};

module.exports = forecast;
