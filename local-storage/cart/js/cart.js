'use strict';
const colorSwatch = document.getElementById('colorSwatch'),
  sizeSwatch = document.getElementById('sizeSwatch'),
  quickCart = document.getElementById('quick-cart'),
  addToCartForm = document.getElementById('AddToCartForm');

const xhrColors = new XMLHttpRequest(),
  xhrSizes = new XMLHttpRequest(),
  xhrCart = new XMLHttpRequest();

xhrCart.addEventListener("load", onLoadCart);
xhrCart.open("GET","https://neto-api.herokuapp.com/cart");
xhrCart.send();

function onLoadColors() {
  let localColor = localStorage.getItem('color');
  let colorsList = JSON.parse(xhrColors.responseText);
  colorSwatch.innerHTML = '<div class="header">Цвет</div>';

  for (let color of colorsList){
    let available = color.isAvailable ? 'available' : 'soldout';
    let disabled = color.isAvailable ? '' : 'disabled';
    let checked = (localColor == color.type) ? 'checked' : ''; 

    colorSwatch.innerHTML += `<div data-value="${color.type}" class="swatch-element color ${color.type} ${available}">
      <div class="tooltip">${color.title}</div>
      <input quickbeam="color" id="swatch-1-${color.type}" type="radio" name="color" value="${color.type}" ${disabled} ${checked}>
      <label for="swatch-1-${color.type}" style="border-color: ${color.type};">
        <span style="background-color: ${color.code};"></span>
        <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
      </label>
    </div>`;
  }  
}

function onLoadSizes() {
  let localSize = localStorage.getItem('size');
  let sizesList = JSON.parse(xhrSizes.responseText);
  sizeSwatch.innerHTML = '<div class="header">Размер</div>';

  for (let size of sizesList){
    let available = size.isAvailable ? 'available' : 'soldout';
    let disabled = size.isAvailable ? '' : 'disabled';
    let checked = (localSize == size.type) ? 'checked' : '';

    sizeSwatch.innerHTML += `<div data-value="${size.type}" class="swatch-element plain ${size.type} ${available}">
      <input id="swatch-0-${size.type}" type="radio" name="size" value="${size.type}" ${disabled} ${checked}>
      <label for="swatch-0-${size.type}">
        ${size.title}
        <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
      </label>
    </div>`;    
  }  
}

function onLoadCart() {
  let cart = JSON.parse(xhrCart.responseText);  
  updateCart(cart);
}

function addToCart(event){
  event.preventDefault();   
  const formData = new FormData(event.target);
  if (formData.get('color') == null) { 
    alert('Выберите цвет!');
    return;
  }
  if (formData.get('size') == null) {
    alert('Выберите размер!');
    return;
  }
  localStorage.setItem('color', formData.get('color'));
  localStorage.setItem('size', formData.get('size'));  
  formData.append('productId', event.target.dataset.productId);
  const xhr = new XMLHttpRequest()
  xhr.addEventListener('load', (e) => {
    let data = JSON.parse(xhr.response);
    if (data.error){
      console.log(data.message);
    }else{
      updateCart(data);
    }
  });
  xhr.open('POST', 'https://neto-api.herokuapp.com/cart');
  xhr.send(formData);
}

function removeProduct(event){
  if (event.target.classList.contains('remove')){
    let productId = event.target.dataset.id;
    const formData = new FormData();
    formData.append('productId', productId);
    const xhr = new XMLHttpRequest()
    xhr.addEventListener('load', (e) => {
      let data = JSON.parse(xhr.response);
      if (data.error){
        console.log(data.message);
      }else{
        updateCart(data);
      }
    });
    xhr.open('POST', 'https://neto-api.herokuapp.com/cart/remove');
    xhr.send(formData);
  }
}

function updateCart(data){
  quickCart.innerHTML = '';
  let total = 0;
  for (let product of data){
    quickCart.innerHTML += `<div class="quick-cart-product quick-cart-product-static" id="quick-cart-${product.id}" style="opacity: 1;">
      <div class="quick-cart-product-wrap">
        <img src="${product.pic}" title="${product.title}">
        <span class="s1" style="background-color: #000; opacity: .5">$${product.price}</span>
        <span class="s2"></span>
      </div>
      <span class="count hide fadeUp" id="quick-cart-product-count-${product.id}">${product.quantity}</span>
      <span class="quick-cart-product-remove remove" data-id="${product.id}"></span>
    </div>`;
    total += parseInt(product.price) * parseInt(product.quantity);
  }
  let open = (data.length > 0) ? 'open' : '';
  quickCart.innerHTML += `<a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico ${open}">
    <span>
      <strong class="quick-cart-text">Оформить заказ<br></strong>
      <span id="quick-cart-price">$${total}</span>
    </span>
  </a>`; 
  
  xhrColors.addEventListener("load", onLoadColors);
  xhrColors.open("GET","https://neto-api.herokuapp.com/cart/colors");
  xhrColors.send();
  
  xhrSizes.addEventListener("load", onLoadSizes);
  xhrSizes.open("GET","https://neto-api.herokuapp.com/cart/sizes");
  xhrSizes.send();
}

addToCartForm.addEventListener('submit', addToCart);

quickCart.addEventListener('click', removeProduct);




