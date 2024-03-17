import {loadComments,clear} from './comments';

const bigPicture = document.querySelector('.big-picture');
const bigPictureElement = document.querySelector('.big-picture__img');
const img = bigPictureElement.querySelector('img');
const likes = document.querySelector('.likes-count');
const caption = document.querySelector('.social__caption');
const closeButton = document.querySelector('.big-picture__cancel');
const closeBigPhoto = () => {
  bigPicture.classList.add('hidden');
  document.querySelector('.social__comment-count').classList.remove('hidden');
  document.querySelector('.comments-loader').classList.remove('hidden');
  document.body.classList.remove('modal-open');
  clear();
};
const onEsc = (evt) => {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    closeBigPhoto();
  }
};


closeButton.addEventListener('click', closeBigPhoto);

const openBigPhoto = (photo) => {
  bigPicture.classList.remove('hidden');
  img.src = photo.url;
  likes.textContent = photo.likes;
  caption.textContent = photo.description;
  loadComments(photo.comments);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEsc);

};
export { openBigPhoto };
