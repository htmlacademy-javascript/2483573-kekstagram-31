import {loadComments,clear} from './comments';
const ESC_KEYCODE = 27;
const bigPicture = document.querySelector('.big-picture');
const bigPictureElement = document.querySelector('.big-picture__img');
const img = bigPictureElement.querySelector('img');
const likes = document.querySelector('.likes-count');
const caption = document.querySelector('.social__caption');
const closeButton = document.querySelector('.big-picture__cancel');

const bigPhotoCloseHandler = () => {
  bigPicture.classList.add('hidden');
  document.querySelector('.social__comment-count').classList.remove('hidden');
  document.querySelector('.comments-loader').classList.remove('hidden');
  document.body.classList.remove('modal-open');
  closeButton.removeEventListener('click',bigPhotoCloseHandler);
  clear();
};
const onEsc = (evt) => {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.preventDefault();
    bigPhotoCloseHandler();
  }
};


const bigPhotoOpenHandler = (photo) => {
  bigPicture.classList.remove('hidden');
  img.src = photo.url;
  likes.textContent = photo.likes;
  caption.textContent = photo.description;
  loadComments(photo.comments);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEsc);
  closeButton.addEventListener('click', bigPhotoCloseHandler);
};

export { bigPhotoOpenHandler };
