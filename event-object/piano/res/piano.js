const piano = document.getElementsByClassName('set');
const sounds = ['first', 'second', 'third', 'fourth', 'fifth'];

const buttons = Array.from(document.getElementsByTagName('li'));

buttons.forEach(function(button, index) {		
	button.addEventListener('click', function pianoRegister(event) {
	let tone;
	let audio = event.currentTarget.getElementsByTagName('audio');
	if (event.shiftKey) {
		tone = 'lower';		
		piano[0].classList.add(tone);		
		audio[0].src = `./sounds/${tone}/${sounds[index]}.mp3.`;
		audio[0].play();		
		return;
	} 
	if (event.altKey) {
		tone = 'higher';
		piano[0].classList.add(tone);
		audio[0].src = `./sounds/${tone}/${sounds[index]}.mp3.`;
		audio[0].play();
		return;
	}
	piano[0].classList.remove('lower', 'higher');
	tone = 'middle';
	piano[0].classList.add(tone);
	audio[0].src = `./sounds/${tone}/${sounds[index]}.mp3.`;		
	audio[0].play();
	return;
});
});