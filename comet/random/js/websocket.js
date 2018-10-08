'use strict';

const websocket = document.querySelector('.websocket');

function loadData(array, data) {
  console.log(array.className, data);
  Array.from(array.querySelectorAll('div')).forEach((number) => {
    number.classList.toggle('flip-it', number.textContent == data);
  });
}

const ws = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');
ws.addEventListener('message', (event) => {
  loadData(websocket, event.data);
})