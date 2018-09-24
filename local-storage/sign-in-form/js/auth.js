'use strict';
const signIn = document.querySelector('.sign-in-htm'),
	signUp = document.querySelector('.sign-up-htm');

signIn.addEventListener('submit', function(event){
	event.preventDefault();  

  const formData = {
    'email': document.querySelector('.sign-in-htm #email').value,
    'password': document.querySelector('.sign-in-htm #pass').value,
    'isPermanent': document.querySelector('.sign-in-htm #check').value
  };

  const output = document.querySelector('.sign-in-htm output');
  const xhr = new XMLHttpRequest()

  xhr.addEventListener('load', function(event) {
    let responseData = JSON.parse(xhr.response);
    if (responseData.error){
      output.value = responseData.message;
      return;
    }
    output.value = 'Пользователь ' + responseData.name + ' успешно авторизован';     
  });

  xhr.open('POST', 'https://neto-api.herokuapp.com/signin');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(formData));
});

signUp.addEventListener('submit', function(event){
  event.preventDefault();    
 
  const formData = {
    'email': document.querySelector('.sign-up-htm [name="email"]').value,
    'password':  document.querySelector('.sign-up-htm [name="password"]').value,
    'passwordcopy':  document.querySelector('.sign-up-htm [name="passwordcopy"]').value,
    'name': document.querySelector('.sign-up-htm [name="name"]').value
  };    

  const output = document.querySelector('.sign-up-htm output');
  const xhr = new XMLHttpRequest()

  xhr.addEventListener('load', function(event) {
    var responseData = JSON.parse(xhr.response);
    if (responseData.error){
      output.value = responseData.message;
      return;
    }
    output.value = 'Пользователь ' + responseData.name + ' успешно зарегистрирован';    
  });

  xhr.open('POST', 'https://neto-api.herokuapp.com/signup');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(formData));  
});
