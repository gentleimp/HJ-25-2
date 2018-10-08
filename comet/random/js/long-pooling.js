'use strict';

const longPooling = document.querySelector('.long-pooling'),
      xhrLongPooling =  new XMLHttpRequest();

function onErrorLPool(event) {  
  if (event.target == xhrLongPooling) {
    console.log('Ошибка в Comet-соединении LongPooling. Перезапуск');
    setTimeout(xhrLongPooling, 2000);
  }
}

function longPoolings() { 
  setInterval(() => {
    xhrLongPooling.open('GET', 'https://neto-api.herokuapp.com/comet/long-pooling', true);
    xhrLongPooling.send();
    console.log('start');    
    xhrLongPooling.addEventListener('load', () => { 
      console.log('end3');

      if (xhrLongPooling.status >= 200 && xhrLongPooling.status < 300) {
        const randNumLongPool = JSON.parse(xhrLongPooling.responseText.trim());
        loadData(longPooling, randNumLongPool);          
      }
    });
  }, 5000);

  xhrLongPooling.addEventListener('error', onErrorLPool);
}

longPoolings();