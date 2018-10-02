'use strict'

const canvas = document.querySelector('#wall'),
  ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const circles = [],
  crosses = [];

function nextPoint(x, y, time) {
  return {
    x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
    y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
  };
}

function nextPoint2(x, y, time) {
  return {
    x: x + Math.sin((x + (time / 10)) / 100) * 5,
    y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
  }
}

function generateCircle() {
  let timeFunction = Math.round(Math.random()*2),
    size = Math.random()*0.5+0.1,
    x = Math.random() * canvas.width,
    y = Math.random() * canvas.height;

  let circle = {x: x, y: y, size: size, timeFunc: timeFunction};  
  circles.push(circle);  
}

function generateCross() {
  let timeFunction = Math.round(Math.random()*2),
    size = Math.random()*0.5+0.1,
    x = Math.random() * canvas.width,
    y = Math.random() * canvas.height,
    angle = Math.round(Math.random()*360),
    rotationSpeed = Math.random()*0.4-0.2;

  let cross = {x: x, y: y, size: size, angle: angle, rotSpeed: rotationSpeed, timeFunc: timeFunction};  
  crosses.push(cross); 
}

function drawCircle(x, y, size, timeFunction) {  
  ctx.lineWidth = 5 * size;
  ctx.strokeStyle = 'white';

  let newCoordinate = {};

  if (timeFunction == 0) {
    newCoordinate = nextPoint(x, y, Date.now());
  } else {
    newCoordinate = nextPoint2(x, y, Date.now());
  }

  ctx.beginPath();
  ctx.arc(newCoordinate.x, newCoordinate.y, 12 * size, 0, 2 * Math.PI, false);
  ctx.stroke();
  ctx.closePath();
}

function drawCross(x, y, size, angle, timeFunction) {
  ctx.lineWidth = 5 * size;
  ctx.strokeStyle = 'white';

  let newCoordinate = {};

  if (timeFunction == 0){
     newCoordinate = nextPoint(x, y, Date.now());
  } else {
     newCoordinate = nextPoint2(x, y, Date.now());
  }

  ctx.beginPath();
  ctx.translate(newCoordinate.x, newCoordinate.y);
  ctx.rotate(angle);
  ctx.moveTo( - 10 * size, 0);
  ctx.lineTo( + 10 * size, 0);
  ctx.moveTo(0,  + 10 * size);
  ctx.lineTo(0,  - 10 * size);
  ctx.stroke();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

for (let i = 0; i < Math.round(Math.random()*150)+50; i++) {
  generateCircle();
  generateCross();
}

var timerId = setInterval(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let circle of circles) {
    drawCircle(circle.x, circle.y, circle.size, circle.timeFunc);
  }

  for (let cross of crosses) {
    cross.angle += cross.rotSpeed;
    drawCross(cross.x, cross.y, cross.size, cross.angle, cross.rotSpeed, cross.timeFunc);
  }
}, 50);