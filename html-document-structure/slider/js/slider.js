
const slides = document.querySelector('.slides'),
	prev = document.querySelector('.slider-nav a[data-action="prev"]'),
	next = document.querySelector('.slider-nav a[data-action="next"]'),
	first = document.querySelector('.slider-nav a[data-action="first"]'),
	last = document.querySelector('.slider-nav a[data-action="last"]');

document.querySelector('li:nth-child(1)').classList.add('slide-current');

next.addEventListener('click', event => {
	const slideCurrent = document.querySelector('li.slide-current');
	if (slideCurrent.nextElementSibling == null) {
		return;
	}		
	prev.classList.remove('disabled');
	first.classList.remove('disabled');
				
	const slideNext = slideCurrent.nextElementSibling;
	slideCurrent.classList.remove('slide-current');
	slideNext.classList.add('slide-current');
	if (slideNext.nextElementSibling == null) {
		next.classList.add('disabled');
		last.classList.add('disabled');
	}		
});

	prev.addEventListener('click', event => {
		const slideCurrent = document.querySelector('li.slide-current');
		if (slideCurrent.previousElementSibling == null) {
			return;
		}
		next.classList.remove('disabled');
		last.classList.remove('disabled');
		
		
		const slidePrev = slideCurrent.previousElementSibling;
		slideCurrent.classList.remove('slide-current');
		slidePrev.classList.add('slide-current');
		if (slidePrev.previousElementSibling == null) {
			prev.classList.add('disabled');
			first.classList.add('disabled');
		}
	});

	first.addEventListener('click', event => {
		const slideCurrent = document.querySelector('li.slide-current');
		if (slideCurrent.previousElementSibling == null) {
			return;
		}
		next.classList.remove('disabled');
		last.classList.remove('disabled');
		
		
		const slideFirst = slides.querySelector('li:first-child');
		slideCurrent.classList.remove('slide-current');
		slideFirst.classList.add('slide-current');
		if (slideFirst.previousElementSibling == null) {
			prev.classList.add('disabled');
			first.classList.add('disabled');
		}
	});

	last.addEventListener('click', event => {
		const slideCurrent = document.querySelector('li.slide-current');
		if (slideCurrent.nextElementSibling == null) {
			return;
		}		
		prev.classList.remove('disabled');
		first.classList.remove('disabled');
		
		
		const slideLast = slides.querySelector('li:last-child');
		slideCurrent.classList.remove('slide-current');
		slideLast.classList.add('slide-current');
		if (slideLast.nextElementSibling == null) {
			next.classList.add('disabled');
			last.classList.add('disabled');
		}	
	});