import { getRandomNumber, generateRandomComment } from './util.js';


// Функция для создания объекта фото
const generatePhoto = function () {
  const commentMin = 0;
  const commentMax = 30;
  const urlMin = 1;
  const urlMax = 25;
  const urlIndex = getRandomNumber(urlMin, urlMax);
  const url = `photos/${urlIndex}.jpg`;
  const commentsNum = getRandomNumber(commentMin, commentMax);
  const photo = {};
  photo.id = getRandomNumber(1, 25);
  photo.url = url;
  photo.description = 'Описание фото';
  photo.likes = getRandomNumber(15, 200);
  photo.comments = Array.from({ length: commentsNum }, generateRandomComment);
  return photo;
};

// Функция для создания массива из 25 объектов photo
const generatePhotosArray = function generatePhotosArray() {
  const photosNum = 25;
  return Array.from({ length: photosNum }, generatePhoto);
};
export {generatePhotosArray,generatePhoto};
