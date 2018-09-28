'use strict';

function addScript(src, getData) {  
  return new Promise((getData) => { 
    
    const script = document.createElement("script");
    script.src = src;
    document.body.appendChild(script);    
  });
}

addScript('https://neto-api.herokuapp.com/food/42?callback=getRecipe', getRecipe);
addScript('https://neto-api.herokuapp.com/food/42/rating?callback=getRating', getRating);
addScript('https://neto-api.herokuapp.com/food/42/consumers?callback=getConsumers', getConsumers);

function getRecipe(data) {
  document.querySelector('.food [data-pic]').style.backgroundImage = `url(${data.pic})`;
  document.querySelector('.food [data-title]').innerHTML = data.title;
  document.querySelector('.food [data-ingredients]').innerHTML = data.ingredients.join(', ');
}

function getRating(data) {
  document.querySelector('.content [data-rating]').innerHTML = data.rating.toFixed(2);
  document.querySelector('.content [data-star]').style.width = (data.rating * 10) + '%';
  document.querySelector('.content [data-votes]').innerHTML = `(${data.votes} оценок)`;
}

function getConsumers(data) {
  const consumersList =  document.querySelector('.content [data-consumers]');
  let shownCons = 0;
  for (let consumer of data.consumers) {
    shownCons++;
    let elem = document.createElement("img");
    elem.setAttribute('src', consumer.pic);
    elem.setAttribute('title', consumer.name);
    consumersList.appendChild(elem);
  }
  let total = document.createElement('span');
  total.innerHTML = `(${data.total - shownCons})`;
  consumersList.appendChild(total);
}