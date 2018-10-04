'use strict'

const url = 'https://neto-api.herokuapp.com/plane/',
      acSelect = document.querySelector('#acSelect'),
      btnSeatMap = document.querySelector('#btnSeatMap'),
      btnSetFull = document.querySelector('#btnSetFull'),
      btnSetEmpty = document.querySelector('#btnSetEmpty'),
      seatMapTitle = document.querySelector('#seatMapTitle'),
      seatMapDiv = document.querySelector('#seatMapDiv'),
      totalPax = document.querySelector('#totalPax'),
      totalAdult = document.querySelector('#totalAdult'),
      totalHalf = document.querySelector('#totalHalf');

let totalPaxAmt = 0, totalAdultAmt = 0, totalHalfAmt = 0;

btnSetFull.disabled = true;
btnSetEmpty.disabled = true;

/*
document.addEventListener('DOMContentLoaded', ()=>{
  btnSetFull.disabled = true;
  btnSetEmpty.disabled = true;
})*/

function showSeatMap(data){  
  seatMapTitle.textContent = `${data.title}(${data.passengers}пассажиров)`;
  let i = 1; 
  const fragment = document.createDocumentFragment();

  for (let row of data.scheme) {
    let curRow = document.createElement('div');
    curRow.className = 'row seating-row text-center';
    if (row == 0) {
      let emptyRow = document.createElement('div');
      emptyRow.className = 'col-xs-4 no-seat';
      curRow.appendChild(emptyRow);
    } else {
      let rowNumber = document.createElement('div');
      rowNumber.className = 'col-xs-1 row-number';
      curRow.appendChild(rowNumber);

      let h2 = document.createElement('h2');
      h2.textContent = i;
      rowNumber.appendChild(h2);
        
      let seatGroup1 = document.createElement('div');
      seatGroup1.className = 'col-xs-5';
      let seatGroup2 = document.createElement('div');
      seatGroup2.className = 'col-xs-5';

      for (let j = 0; j < row; j++) {
        let letters;
        if (row == 4) letters = data.letters4;
        else letters = data.letters6;
        let seat = document.createElement('div');
        seat.className = 'col-xs-4 seat';
        let seatLabel = document.createElement('span');
        seatLabel.className = 'seat-label';
        seatLabel.textContent = letters[j];
        seat.appendChild(seatLabel);       
        if (j < 3) {
          seatGroup1.appendChild(seat);         
        } else {
          seatGroup2.appendChild(seat);        
        }
      }
      curRow.appendChild(seatGroup1);
      curRow.appendChild(seatGroup2);
      fragment.appendChild(curRow);
      i += 1;   
    }
  }
  let seatMapDivH3 = document.querySelector('#seatMapDiv h3.text-center');
  seatMapDiv.removeChild(seatMapDivH3);
  seatMapDiv.appendChild(fragment);  

  btnSetFull.disabled = false;
  btnSetEmpty.disabled = false;
};

btnSeatMap.addEventListener('click', (event) => {
  event.preventDefault();
  
  fetch(url + acSelect.value)
    .then(res => res.json())
    .then(showSeatMap);  
});

seatMapDiv.addEventListener('click', (event) => {
  if (event.target.classList.contains('seat')) {
    if (event.altKey) {
      if (event.target.classList.contains('half')) {
        event.target.classList.remove('half');
        totalHalfAmt -= 1;
        totalPaxAmt -= 0.5;
      } else {
        event.target.classList.add('half');
        event.target.classList.remove('adult');
        totalHalfAmt += 1;
        totalPaxAmt += 0.5;
      }

    } else {
      if (event.target.classList.contains('adult')) {
        event.target.classList.remove('adult');
        totalAdultAmt -= 1;
        totalPaxAmt -= 1;
      }else{
        if (event.target.classList.contains('half')) {
          event.target.classList.remove('half');
          totalHalfAmt -= 1;
          totalPaxAmt -= 0.5;
        }
        event.target.classList.add('adult');        
        totalAdultAmt += 1;
        totalPaxAmt += 1;
      }
    }           
  }

  if (event.target.classList.contains('seat-label')) {
    event.target.parentElement.click();
  }

  totalPax.textContent = totalPaxAmt;
  totalAdult.textContent = totalAdultAmt;
  totalHalf.textContent = totalHalfAmt;
});

btnSetFull.addEventListener('click', (event) => {
  event.preventDefault();
  let seats = seatMapDiv.querySelectorAll('.seat');  

  for (let seat of seats) {
    seat.classList.add('adult');
    seat.classList.remove('half');
    totalAdultAmt += 1;    
  }  

  totalPaxAmt = totalAdultAmt;
  totalPax.textContent = totalPaxAmt;
  totalAdult.textContent = totalAdultAmt;
  totalHalf.textContent = 0;
});

btnSetEmpty.addEventListener('click', (event) => {
  event.preventDefault();
  totalPaxAmt = 0; 
  totalAdultAmt = 0; 
  totalHalfAmt = 0;

  let seats = seatMapDiv.querySelectorAll('.seat');

  for (let seat of seats) {
    seat.classList.remove('adult');
    seat.classList.remove('half');
  }

  totalPax.textContent = 0;
  totalAdult.textContent = 0;
  totalHalf.textContent = 0;  
});

