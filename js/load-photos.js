import{openBigPhoto} from './open-close-full-photo.js';
import { comparePhotos } from './util.js';
const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
const dataErrorTemplate = document.querySelector('#data-error').content;
const disscusedButton = document.querySelector('#filter-discussed');
const randomButton = document.querySelector('#filter-random');
const defaultButton = document.querySelector('#filter-default');
const createdPhotosFragment = document.createDocumentFragment();
const photosList = document.querySelector('.pictures');
const imgFilter = document.querySelector('.img-filters'); // Use querySelector instead of querySelectorAll

let discussedIsClicked = false;
let randomIsClicked = false;
let defaultIsClicked = true;

const clickedFalse = () => {
  discussedIsClicked = false;
  randomIsClicked = false;
  defaultIsClicked = false;
};

const setDefaultClick = () => {
  clickedFalse();
  defaultIsClicked = true;
  imgFilter.classList.remove('img-filters__button--active');
  defaultButton.classList.add('img-filters__button--active');

};

const setRandomClick = () => {
  clickedFalse();
  randomIsClicked = true;
  imgFilter.classList.remove('img-filters__button--active');
  randomButton.classList.add('img-filters__button--active');

};

const setDisscusedClick = () => {
  clickedFalse();
  discussedIsClicked = true;
  imgFilter.classList.remove('img-filters__button--active');
  disscusedButton.classList.add('img-filters__button--active');

};

disscusedButton.addEventListener('click', setDisscusedClick);
defaultButton.addEventListener('click', setDefaultClick);
randomButton.addEventListener('click', setRandomClick);

const loadPhotos = (photos) => {
  const sortedPhotos = photos.slice(); // Default to the original order
  if (discussedIsClicked) {
    sortedPhotos.sort(comparePhotos.disscused);
  } if (randomIsClicked) {
    sortedPhotos.sort(comparePhotos.random);
  } if (defaultIsClicked){
    sortedPhotos.slice();
  }

  photosList.innerHTML = ''; // Clear the photosList before appending
  sortedPhotos.forEach(({ url, description, likes, comments, id }) => {
    const photosParts = picturesTemplate.cloneNode(true);
    photosParts.querySelector('img').src = url;
    photosParts.querySelector('img').alt = description;
    photosParts.querySelector('.picture__likes').textContent = likes;
    photosParts.querySelector('.picture__comments').textContent = comments.length;
    photosParts.dataset.id = id;
    photosParts.addEventListener('click', (event) => {
      const currentPicture = photos.find((photo) => event.currentTarget.dataset.id === photo.id.toString());
      openBigPhoto(currentPicture);
      createdPhotosFragment.append(photosParts);
    });
    // photosList.innerHTML = '';
    photosList.append(createdPhotosFragment);

  });
};
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
