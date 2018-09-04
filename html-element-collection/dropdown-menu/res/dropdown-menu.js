const dropdownmenu = document.getElementsByClassName('wrapper-dropdown');

function menuClick() {
	this.classList.toggle('active');
}

for (element of dropdownmenu) {
	element.onclick = menuClick;
}

