const form = document.querySelector('form');
const input = document.querySelector('input');

const message1 = document.getElementById('message-1');
const message2 = document.getElementById('message-2');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  message1.textContent = 'Loading...';
  const location = input.value;

  fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
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
