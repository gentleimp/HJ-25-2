'use strict'

const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');
const colorVrts = ['#ffffff', '#ffe9c4', '#d4fbff'];

function skyGenerator() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  let amtOfStars = Math.round(Math.random()*200) + 200;
  for (let i = 0; i < amtOfStars; i++) {
    let size = Math.random()*1.1;    
    let color = colorVrts[Math.round(Math.random()*2)];
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let opacity = Math.random()*0.2 + 0.8;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.globalAlpha = opacity;
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }
}

canvas.addEventListener('click', skyGenerator);