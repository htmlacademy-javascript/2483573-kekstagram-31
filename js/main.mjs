/* eslint-disable no-console */
import {generatePhotosArray} from './post.js';
import './load-photos.js';
import './open-close-full-photo.js';
import './new-photos-forms-handler.js';
import './scale-redactor.js';
import './filter-redactor.js';
const photosArray = generatePhotosArray();
console.log(photosArray);
