'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/counter'),
  cnctsCounter = document.querySelector('.counter'),
  errsCounter = document.querySelector('output.errors');

document.addEventListener('load', () => {
  connection.addEventListener('open', )
});

connection.addEventListener('message', event => {
  let message = JSON.parse(event.data);
  cnctsCounter.innerHTML = message.connections;
  errsCounter.innerHTML = message.errors;
})

window.addEventListener('beforeunload', () => {
  connection.onclose = function () {};
  connection.close(1000);
});

connection.addEventListener('error', error => {
console.log(`Произошла ошибка: ${error.data}`);
});