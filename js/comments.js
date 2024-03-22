let commentsArr = [];
let currentComments = 0;
const CommentsStep = 5;
const socialComments = document.querySelector('.social__comments');
const commentsCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
socialComments.innerHTML = '';


const loadAllComments = () => {

  const socialCommentFragment = document.createDocumentFragment();
  commentsCount.classList.remove('hidden');
  const loadedComments = commentsArr.slice(currentComments, currentComments += CommentsStep);
  //const loadedCommentsLength = loadedComments.length += CommentsStep;

  loadedComments.forEach((comment) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');
    commentElement.innerHTML = `
      <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
      <p class="social__text">${comment.message}</p>
    `;
    socialComments.appendChild(commentElement);
    socialComments.appendChild(socialCommentFragment);


  });

  commentsCount.querySelector('.social__comment-shown-count').textContent = currentComments >= commentsArr.length ? commentsArr.length : currentComments;
  commentsCount.querySelector('.social__comment-total-count').textContent = commentsArr.length ;
  if (currentComments >= commentsArr.length) {
    commentsLoader.classList.add('hidden');
  }

};
const clear = () => {
  socialComments.innerHTML = '';
  commentsLoader.classList.remove('hidden');
  currentComments = 0;
  commentsLoader.removeEventListener('click', loadAllComments);

};
const loadComments = (comments) => {
  commentsArr = comments;
  loadAllComments();
  commentsLoader.addEventListener('click', loadAllComments);
};
export{clear,loadComments};
