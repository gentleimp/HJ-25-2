const xhrBookCatalog = new XMLHttpRequest();
const content = document.querySelector('#content');

xhrBookCatalog.open('GET', 'https://neto-api.herokuapp.com/book/', true);
xhrBookCatalog.send();

xhrBookCatalog.addEventListener('load', function() {	
 	const books = JSON.parse(xhrBookCatalog.responseText);
  	
  	content.innerHTML = '';

  	for (bookData of books) {
		let book = content.appendChild(document.createElement('li'));
		book.dataset.title = bookData['title'];
    	book.dataset.author = bookData['author']['name'];
    	book.dataset.info = bookData['info'];
    	book.dataset.price = bookData['price'];    	
    	let cover = book.appendChild(document.createElement('img'));
    	cover.src = bookData['cover']['small'];
    }
});

