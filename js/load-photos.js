
import{openBigPhoto} from './open-close-full-photo.js';
const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
const dataErrorTemplate = document.querySelector('#data-error').content;


const createdPhotosFragment = document.createDocumentFragment();

const photosList = document.querySelector('.pictures');
const loadPhotos = (photos) => {
  photos.forEach(({url, description, likes, comments, id}) => {
    const photosParts = picturesTemplate.cloneNode(true);
    photosParts.querySelector('img').src = url;
    photosParts.querySelector('img').alt = description;
    photosParts.querySelector('.picture__likes').textContent = likes;
    photosParts.querySelector('.picture__comments').textContent = comments.length;
    photosParts.dataset.id = id;
    photosParts.addEventListener('click',(event) => {
      const curentPicture = photos.find((photo) => event.currentTarget.dataset.id === photo.id.toString());
      openBigPhoto(curentPicture);
    });
    createdPhotosFragment.append(photosParts);
  });
  photosList.append(createdPhotosFragment);
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

export{loadPhotos,showDataErrorMessage};
