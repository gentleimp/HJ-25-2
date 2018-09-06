const codeChar = ['Y', 'T', 'N', 'J', 'K', 'J', 'U', 'B', 'Z'];
let printCode, hitCounter = 0;

function easterEgg(event) {
	console.log(event.code);
	if (event.ctrlKey && event.altKey && event.code == 'KeyT') {
		document.querySelector('nav').classList.toggle('visible');
	}
}

function secretCode(event) {
	if (event.code == `Key${codeChar[hitCounter]}`) {
		hitCounter++;
		if (hitCounter == 9) {
			document.querySelector('.secret').classList.add('visible');
		}
		return;
	} 
	hitCounter = 0;
}

document.addEventListener('keydown', easterEgg);
document.addEventListener('keydown', secretCode);