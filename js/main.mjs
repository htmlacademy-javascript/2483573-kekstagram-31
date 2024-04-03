/* eslint-disable no-console */
import { loadPhotos,showDataErrorMessage } from './load-photos.js';
import { sendFormData , showSuccessWindow} from './new-photos-forms-handler.js';
import { getData } from './api.js';
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


