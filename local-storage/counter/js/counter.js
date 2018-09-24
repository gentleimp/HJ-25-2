'use strict';

const counter = document.querySelector('#counter'),
	increment = document.querySelector('#increment'),
	decrement = document.querySelector('#decrement'),
	reset = document.querySelector('#reset'),
	wrapBtns = document.querySelector('.wrap-btns');

let count = localStorage.getItem('counter') || 0;

function writeCounter() {
  counter.innerHTML = count;
  localStorage.setItem('counter', count);
}

function changeCounter() {
	switch (event.target) {
		case increment:
			count++;
			break;
		case decrement:
			if (count > 0) {
				count--;
			}
			break;
		case reset:
			count = 0;
	}	
  	writeCounter();
}

wrapBtns.addEventListener('click', changeCounter);
writeCounter();

