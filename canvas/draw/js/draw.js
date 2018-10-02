'use strict';

const canvas = document.querySelector('#draw'),
  ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', (e) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const toneMin = 0, toneMax = 359,
  thicknessMin = 5, thicknessMax = 100; 
  
let tone = 0, toneMode, 
  thickness = 100, thicknessMode = -1;

ctx.lineJoin = 'round';
ctx.lineCap = 'round';

function lineDrawing(e) {    
    ctx.lineTo(e.clientX, e.clientY);  

    if (thickness == thicknessMin) {
      thicknessMode = 1;
    } else if (thickness == thicknessMax) {
      thicknessMode = -1;
    }
    thickness += thicknessMode;
    ctx.lineWidth = thickness;
    
    if (toneMode) {
      tone += 1;
    } else tone -= 1;  
    ctx.strokeStyle = `hsl(${tone}, 100%, 50%)`;  
    ctx.stroke();
}

canvas.addEventListener('mousedown', (e) => {
  toneMode = e.shiftKey; 

  ctx.beginPath();
  ctx.moveTo(e.clientX, e.clientY);
  e.preventDefault();
  canvas.addEventListener('mousemove', lineDrawing);
});

canvas.addEventListener('mouseup', () => {
  canvas.removeEventListener('mousemove', lineDrawing);
});

canvas.addEventListener('dblclick', () => { 
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

canvas.addEventListener("mouseleave", () => {
  canvas.removeEventListener('mousemove', lineDrawing);
});

