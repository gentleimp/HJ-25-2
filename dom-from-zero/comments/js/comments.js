'use strict';
//было
/*
function showComments(list) {
  const commentsContainer = document.querySelector('.comments');
  const comments = list.map(createComment).join('');
  commentsContainer.innerHTML += comments;
}

function createComment(comment) {
  return `<div class="comment-wrap">
    <div class="photo" title="${comment.author.name}">
      <div class="avatar" style="background-image: url('${comment.author.pic}')"></div>
    </div>
    <div class="comment-block">
      <p class="comment-text">
        ${comment.text.split('\n').join('<br>')}
      </p>
      <div class="bottom-comment">
        <div class="comment-date">${new Date(comment.date).toLocaleString('ru-Ru')}</div>
        <ul class="comment-actions">
          <li class="complain">Пожаловаться</li>
          <li class="reply">Ответить</li>
        </ul>
      </div>
    </div>
  </div>`
}

fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments);
*/

//стало
function showComments(list) {
  const commentsContainer = document.querySelector('.comments');
  const commentNodes = list.map(createComment);
  const fragment = commentNodes.reduce((fragment, currentValue) => {
    fragment.appendChild(currentValue);
    return fragment;
  }, document.createDocumentFragment());

  commentsContainer.appendChild(fragment);
}

function createComment(comment) {
  const commentWrap = document.createElement('div');
  commentWrap.className = 'comment-wrap';
  const photo = document.createElement('div');  
  photo.className = 'photo';
  photo.setAttribute('title', comment.author.name);
  commentWrap.appendChild(photo);  
  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  avatar.style.backgroundImage = comment.author.pic;
  photo.appendChild(avatar);

  const commentBlock = document.createElement('div');
  commentBlock.className = 'comment-block';
  commentWrap.appendChild(commentBlock);

  const commentText = document.createElement('p');
  commentText.className = 'comment-text';
  commentText.textContent = comment.text;
  commentText.style.whiteSpace = 'pre-line';
  commentBlock.appendChild(commentText);
  const bottomComment = document.createElement('div');
  bottomComment.className = 'bottom-comment';
  commentBlock.appendChild(bottomComment);

  const commentDate = document.createElement('div');
  commentDate.className = 'comment-date';
  commentDate.textContent = new Date(comment.date).toLocaleString('ru-Ru');
  bottomComment.appendChild(commentDate);
  const commentActions = document.createElement('ul');
  commentActions.className = 'comment-actions';
  bottomComment.appendChild(commentActions);

  const complain = document.createElement('li');
  complain.className = 'complain';
  complain.textContent = 'Пожаловаться';
  commentActions.appendChild(complain);
  const reply = document.createElement('li');
  reply.className = 'reply';
  reply.textContent = 'Ответить';  
  commentActions.appendChild(reply);  
  
  return commentWrap;
}

fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments);