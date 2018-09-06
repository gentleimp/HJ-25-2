const miniatures = document.getElementsByTagName('a');

function selection(event) {
	event.preventDefault();
	for (miniature of miniatures) {
		miniature.classList.remove('gallery-current');
	}
	event.currentTarget.classList.add('gallery-current');
	let bigPhoto = document.querySelector('#view');	
	bigPhoto.src = document.querySelector('.gallery-current').href;
}

for (miniature of miniatures) {
	miniature.addEventListener('click', selection);
}