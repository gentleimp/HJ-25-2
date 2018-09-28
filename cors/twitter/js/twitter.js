'use strict';

function loadData(src, getData) {  
  return new Promise((getData) => { 
    
    const script = document.createElement("script");
    script.src = src;
    document.body.appendChild(script);    
  });
}

function getUserData(data) {
  document.querySelector('.bio .bg').setAttribute('src', data.wallpaper);
  document.querySelector('.bio .desc h3').innerHTML = data.username;
  document.querySelector('.bio .desc p').innerHTML = data.description;
  document.querySelector('.avatarcontainer .avatar').setAttribute('src', data.pic);
  document.querySelector('.data [data-tweets]').innerHTML = data.tweets;
  document.querySelector('.data [data-followers]').innerHTML = data.followers;
  document.querySelector('.data [data-following]').innerHTML = data.following;
}

loadData('https://neto-api.herokuapp.com/twitter/jsonp?callback=getUserData', getUserData);