"use strict";

var form = document.querySelector('form');
var input = document.querySelector('input');
var message1 = document.getElementById('message-1');
var message2 = document.getElementById('message-2');
form.addEventListener('submit', function (event) {
  event.preventDefault();
  message1.textContent = 'Loading...';
  var location = input.value;
  fetch("/weather?address=".concat(location)).then(function (response) {
    response.json().then(function (data) {
      if (data.error) {
        message1.textContent = data.error;
        message2.textContent = '';
        return;
      }

      message1.textContent = data.location;
      message2.textContent = data.forecast;
    });
  });
  message2.textContent = '';
  input.value = '';
});