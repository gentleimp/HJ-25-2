const drumButtons = document.getElementsByClassName('drum-kit__drum');

function drumKitClick() {
	const drumAudio = this.getElementsByTagName('audio');

	for (drum of drumAudio) {
		drum.play();
	}	
}

for (button of drumButtons) {
	button.onclick = drumKitClick;
}