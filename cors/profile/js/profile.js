'use strict';
const content = document.querySelector('.content'),
  badge = document.querySelector('.content [data-technologies]');

function addScript(src, getData) {  
  return new Promise((getData) => { 
    
    const script = document.createElement("script");
    script.src = src;
    document.body.appendChild(script);    
  });
}

function getUserData(data) {
  let userId = data.id;  
  addScript(`https://neto-api.herokuapp.com/profile/${userId}/technologies?callback=getTech`, getTech);
  document.querySelector('.card [data-name]').innerHTML = data.name;
  document.querySelector('.card [data-description]').innerHTML = data.description;
  document.querySelector('.card [data-position]').innerHTML = data.position;
  document.querySelector('.card [data-pic]').setAttribute('src', data.pic);
}

addScript('https://neto-api.herokuapp.com/profile/me?callback=getUserData', getUserData);

function getTech(data) {
  for (let tech of data) {
    let elem = document.createElement("span");    
    elem.classList.add('devicons');
    elem.classList.add(`devicons-${tech}`);
    badge.appendChild(elem);
  }
  content.style.display = 'initial';
}