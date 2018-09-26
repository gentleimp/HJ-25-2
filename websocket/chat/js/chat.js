'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/chat'),
  chat = document.querySelector('.chat'),
  status = document.querySelector('.chat .chat-status'),
  msgBox = document.querySelector('.chat .message-box'),  
  msgSubmit = document.querySelector('.chat .message-submit'),
  msgInput = document.querySelector('.chat .message-input'),
  msgContent = document.querySelector('.chat .messages-content'),
  msgWrites = document.querySelector('.chat .loading'),
  msgStatus = document.querySelector('.chat .message-status'),
  msgPersonal = document.querySelector('.chat .message-personal'),  
  msg = document.querySelector('.chat .message:not(.loading)');

connection.addEventListener('open', () => {
  status.innerHTML = status.dataset.online;
  msgSubmit.disabled = false;
  let newMsgSubmit = msgStatus.cloneNode(true);
  newMsgSubmit.innerHTML = 'Пользователь появился в сети';
  msgContent.appendChild(newMsgSubmit);
});

connection.addEventListener('message', (e) => {
  let message = e.data;

  if (message == '...') {
    msgContent.appendChild(msgWrites.cloneNode(true));

  } else {
    let newMsg = msg.cloneNode(true);

    if (msgContent.querySelector('.loading') != null){
      msgContent.querySelector('.loading').remove();
    }    
    newMsg.querySelector('.message-text').innerHTML = message;
    newMsg.querySelector('.timestamp').innerHTML = getMsgTime();
    msgContent.appendChild(newMsg);
  }
});

msgBox.addEventListener('submit', (e) => {
  e.preventDefault();
  
  let newMsg = msgPersonal.cloneNode(true),
    inputText = msgInput.value;

  newMsg.querySelector('.message-text').innerHTML = inputText;   
  newMsg.querySelector('.timestamp').innerHTML = getMsgTime();    
  msgContent.appendChild(newMsg);
  connection.send(inputText);
  msgInput.value = '';
});

function getMsgTime() {
  let time = new Date(),
    timeOptions = {hour: '2-digit', minute: '2-digit'};
  return time.toLocaleString('ru-RU', timeOptions);
}

connection.addEventListener('close', (e) => {
  status.innerHTML = status.dataset.offline;
  msgSubmit.disabled = true;
  let newMsgSubmit = msgStatus.cloneNode(true);
  newMsgSubmit.innerHTML = 'Пользователь не в сети';
  msgContent.appendChild(newMsgSubmit);
});

connection.addEventListener('error', error => {
console.log(`Произошла ошибка: ${error.data}`);
});