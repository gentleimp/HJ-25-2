const articles = document.querySelector('.tabs-content').children,
	tabsNav = document.querySelector('.tabs-nav'),
	demoTab = document.querySelector('.tabs-nav li');

document.addEventListener('DOMContentLoaded', function(){

	for (const article of articles) {
		let newTab = tabsNav.appendChild(demoTab.cloneNode(true));
		newTab.firstElementChild.textContent = article.dataset.tabTitle;
	    newTab.firstElementChild.classList.add(article.dataset.tabIcon);

	    newTab.addEventListener('click', function(event) {
	    	let currentTab = event.currentTarget;
	   		document.querySelector('.ui-tabs-active').classList.remove('ui-tabs-active');
			currentTab.classList.add('ui-tabs-active');
			
	  		for (const article of articles) {
	    		if (article.dataset.tabTitle == currentTab.textContent){
	      			article.classList.remove('hidden');
	    		} else {
	      			article.classList.add('hidden');
	    		}
	    	}
	  	});
	}

	tabsNav.removeChild(demoTab);
	tabsNav.firstElementChild.classList.add('ui-tabs-active');
});

