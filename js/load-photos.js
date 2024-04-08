import{openBigPhoto} from './open-close-full-photo.js';
import { comparePhotos } from './util.js';
const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
const dataErrorTemplate = document.querySelector('#data-error').content;
const disscusedButton = document.querySelector('#filter-discussed');
const randomButton = document.querySelector('#filter-random');
const defaultButton = document.querySelector('#filter-default');
const createdPhotosFragment = document.createDocumentFragment();
const photosList = document.querySelector('.pictures');
const activeClass = 'img-filters__button--active';
const TIMER_DELAY = 500;
let discussedIsClicked = false;
let randomIsClicked = false;
let defaultIsClicked = true;
let timer;
const clearPhotos = () => {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((picture) => picture.remove());
};

const focusRemover = () => {
  discussedIsClicked = false;
  randomIsClicked = false;
  defaultIsClicked = false;
  disscusedButton.classList.remove(`${activeClass}`);
  randomButton.classList.remove(`${activeClass}`);

};


const setDefaultClick = () => {
  if (!defaultIsClicked) {
    clearTimeout(timer);
    focusRemover();
    defaultIsClicked = true;
    timer = setTimeout(() => loadPhotos(), TIMER_DELAY);
    defaultButton.classList.add(activeClass);
  }
};

const setRandomClick = () => {
  if (!randomIsClicked) {
    clearTimeout(timer);
    focusRemover();
    randomIsClicked = true;
    defaultButton.classList.remove(`${activeClass}`);
    timer = setTimeout(() => loadPhotos(), TIMER_DELAY);
    randomButton.classList.add(activeClass);
  }
};

const setDisscusedClick = () => {
  if (!discussedIsClicked) {
    clearTimeout(timer);
    focusRemover();
    discussedIsClicked = true;
    timer = setTimeout(() => loadPhotos(), TIMER_DELAY);
    defaultButton.classList.remove(`${activeClass}`);
    disscusedButton.classList.add(activeClass);
  }
};


disscusedButton.addEventListener('click', setDisscusedClick);
defaultButton.addEventListener('click', setDefaultClick);
randomButton.addEventListener('click', setRandomClick);

let list = [];

function loadPhotos (photos) {
  if (photos){
    list = photos;
  }
  clearPhotos();
  let sortedPhotos = list.slice();
  if (discussedIsClicked) {
    sortedPhotos.sort(comparePhotos.disscused);
  } if (randomIsClicked) {
    sortedPhotos = comparePhotos.random(sortedPhotos);
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
      openBigPhoto(currentPicture);

    });


  });
  photosList.append(createdPhotosFragment);
}
let dataErrorArea = dataErrorTemplate.cloneNode(true);

const closeDataError = () => {
  dataErrorArea = document.querySelector('.data-error');
  document.body.removeChild(dataErrorArea);
};
const ERROR_MESSAGE_TIME = 5000;
const showDataErrorMessage = () => {
  document.body.appendChild(dataErrorArea);
  setTimeout(closeDataError,ERROR_MESSAGE_TIME);

};

export{loadPhotos,showDataErrorMessage,setDefaultClick,setDisscusedClick,setRandomClick};
