'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/mouse'),
  body = document.querySelector('body');

function sendClick(event) {
  let coordinates = {x: client.screenX, y: client.screenY};

   connection.send(JSON.stringify(coordinates));   
}

document.addEventListener('click', sendClick);

connection.addEventListener('open', showBubbles(connection));

connection.addEventListener('error', error => {
  console.log(`Произошла ошибка: ${error.data}`);
});

window.addEventListener('beforeunload', () => {
  connection.close(1000);
});