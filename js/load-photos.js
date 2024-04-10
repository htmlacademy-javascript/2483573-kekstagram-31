import{openBigPhotoHandler} from './open-close-full-photo.js';
import { ComparePhotos} from './util.js';
const ACTIVE_CLASS = 'img-filters__button--active';
const TIMER_DELAY = 500;
const ERROR_MESSAGE_TIME = 5000;
const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
const dataErrorTemplate = document.querySelector('#data-error').content;
const disscusedButton = document.querySelector('#filter-discussed');
const randomButton = document.querySelector('#filter-random');
const defaultButton = document.querySelector('#filter-default');
const createdPhotosFragment = document.createDocumentFragment();
const photosList = document.querySelector('.pictures');

let discussedIsClicked = false;
let randomIsClicked = false;
let defaultIsClicked = true;
let timer;
let list = [];

const clearPhotos = () => {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((picture) => picture.remove());
};

const focusRemover = () => {
  discussedIsClicked = false;
  randomIsClicked = false;
  defaultIsClicked = false;
  disscusedButton.classList.remove(`${ACTIVE_CLASS}`);
  randomButton.classList.remove(`${ACTIVE_CLASS}`);

};


const onDefaultClick = () => {
  if (!defaultIsClicked) {
    clearTimeout(timer);
    focusRemover();
    defaultIsClicked = true;
    timer = setTimeout(() => loadPhotos(), TIMER_DELAY);
    defaultButton.classList.add(ACTIVE_CLASS);
  }
};

const onRandomClick = () => {
  if (!randomIsClicked) {
    clearTimeout(timer);
    focusRemover();
    randomIsClicked = true;
    defaultButton.classList.remove(`${ACTIVE_CLASS}`);
    timer = setTimeout(() => loadPhotos(), TIMER_DELAY);
    randomButton.classList.add(ACTIVE_CLASS);
  }
};

const onDisscusedClick = () => {
  if (!discussedIsClicked) {
    clearTimeout(timer);
    focusRemover();
    discussedIsClicked = true;
    timer = setTimeout(() => loadPhotos(), TIMER_DELAY);
    defaultButton.classList.remove(`${ACTIVE_CLASS}`);
    disscusedButton.classList.add(ACTIVE_CLASS);
  }
};


disscusedButton.addEventListener('click', onDisscusedClick);
defaultButton.addEventListener('click', onDefaultClick);
randomButton.addEventListener('click', onRandomClick);


function loadPhotos (photos) {
  if (photos){
    list = photos;
  }
  clearPhotos();
  let sortedPhotos = list.slice();
  if (discussedIsClicked) {
    sortedPhotos.sort(ComparePhotos.disscused);
  } if (randomIsClicked) {
    sortedPhotos = ComparePhotos.random(sortedPhotos);
  } if (defaultIsClicked){
    sortedPhotos.slice();
  }

  sortedPhotos.forEach(({ url, description, likes, comments, id }) => {
    const photosParts = picturesTemplate.cloneNode(true);
    photosParts.querySelector('img').src = url;
    photosParts.querySelector('img').alt = description;
    photosParts.querySelector('.picture__likes').textContent = likes;
    photosParts.querySelector('.picture__comments').textContent = comments.length;
    photosParts.dataset.id = id;
    createdPhotosFragment.append(photosParts);
    photosParts.addEventListener('click', (event) => {
      const currentPicture = list.find((photo) => event.currentTarget.dataset.id === photo.id.toString());
      openBigPhotoHandler(currentPicture);
    }

    );


  });
  photosList.append(createdPhotosFragment);
}
let dataErrorArea = dataErrorTemplate.cloneNode(true);

const closeDataError = () => {
  dataErrorArea = document.querySelector('.data-error');
  document.body.removeChild(dataErrorArea);
};

const showDataErrorMessage = () => {
  document.body.appendChild(dataErrorArea);
  setTimeout(closeDataError,ERROR_MESSAGE_TIME);

};

export{loadPhotos,showDataErrorMessage,onDefaultClick,onDisscusedClick,onRandomClick};
