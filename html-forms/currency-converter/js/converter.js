

const xhrCurrencies = new XMLHttpRequest(),
	content = document.querySelector('#content'),
	loader = document.querySelector('#loader'),
	selects = document.querySelectorAll('#content select'),
	from = document.querySelector('#from'),
	to = document.querySelector('#to'),
	amountOfCur = document.querySelector('#source'),
	result = document.querySelector('#result');;


xhrCurrencies.open('GET', 'https://neto-api.herokuapp.com/currency', true);
xhrCurrencies.send();

document.addEventListener('DOMContentLoaded', function(){ 
	loader.classList.remove('hidden');	
});

function convert(){
	let amount = 0;
	amount = parseFloat(amountOfCur.value) / (parseFloat(to.value)) * (parseFloat(from.value));  	
  	result.value = amount.toFixed(2);
}

xhrCurrencies.addEventListener('load', function() {	
 	const rates = JSON.parse(xhrCurrencies.responseText);
 	for (rate of rates) {
 		for (select of selects) {
 			let currency = select.appendChild(document.createElement('option'));
 			currency.value = rate.value;
 			currency.innerHTML = rate.code;
 		}
 	} 	
 	content.classList.remove('hidden');
  	loader.classList.add('hidden');
})

from.addEventListener('change', convert);
to.addEventListener('change', convert);
amountOfCur.addEventListener('input', convert);