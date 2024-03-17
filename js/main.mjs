/* eslint-disable no-console */
import {generatePhotosArray} from './post.js';
import './template.js';
import './openCloseFullPhoto.js';
import './comments.js';
const photosArray = generatePhotosArray();
console.log(photosArray);
