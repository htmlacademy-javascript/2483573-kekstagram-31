/* eslint-disable no-console */
import { loadPhotos } from './load-photos.js';
import { sendFormData } from './new-photos-forms-handler.js';
import { showSuccessWindow } from './new-photos-forms-handler.js';
import { getData } from './api.js';
import { showDataErrorMessage } from './load-photos.js';
import './load-photos.js';
import './open-close-full-photo.js';
import './new-photos-forms-handler.js';
import './scale-redactor.js';
import './filter-redactor.js';
// import {generatePhotosArray} from './post.js';
// const photosArray = generatePhotosArray();
getData()
  .then((loadedPhotos) => {
    console.log(loadedPhotos);
    loadPhotos(loadedPhotos);
  })
  .catch(
    showDataErrorMessage
  );
sendFormData(showSuccessWindow);


