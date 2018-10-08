'use strict';

const pooling = document.querySelector('.pooling'),
      xhrPooling =  new XMLHttpRequest();

function onErrorPool(event) {
  if (event.target == xhrPooling) {
    console.log('Ошибка в Comet-соединении Pooling. Перезапуск');
    setTimeout(xhrPooling, 2000);
  }  
}

function poolings() { 
  setInterval(() => {
    xhrPooling.open('GET', 'https://neto-api.herokuapp.com/comet/pooling', true);
    xhrPooling.send();
    xhrPooling.addEventListener('load', () => {

      if (xhrPooling.status >= 200 && xhrPooling.status < 300) {
        const randNumPool = JSON.parse(xhrPooling.responseText);
        loadData(pooling, randNumPool);
      }
    });
  }, 5000);
  
  xhrPooling.addEventListener('error', onErrorPool);
}

poolings();