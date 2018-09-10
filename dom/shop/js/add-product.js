const buttons = document.querySelectorAll('button.add');
const cartCount = document.querySelector('#cart-count');
const cartTotalPrice = document.querySelector('#cart-total-price');

function addProduct() {		 
	cartCount.innerHTML++;
	cartTotalPrice.innerHTML = parseInt(cartTotalPrice.innerHTML) + parseInt(event.currentTarget.getAttribute('data-price'));
}

for (button of buttons) {
	button.addEventListener('click', addProduct);
}