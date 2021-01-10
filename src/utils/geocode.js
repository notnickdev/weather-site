const request = require('postman-request');

require('dotenv').config();

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${process.env.ACCESS_TOKEN}&limit=1`;
  request({ url, json: true }, (error, response, { features }) => {
    if (error) {
      callback(
        'Unable to connect to mapbox. Please try again later',
        undefined
      );
    } else if (!features.length) {
      callback('Please provide a valid location.', undefined);
    } else {
      callback(undefined, {
        latitude: features[0].center[1],
        longitude: features[0].center[0],
        location: features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
