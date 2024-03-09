/*
 На основе временных данных для разработки и шаблона #picture создайте DOM-элементы, соответствующие фотографиям, и заполните их данными:

    Адрес изображения url подставьте как атрибут src изображения.
    Описание изображения description подставьте в атрибут alt изображения.
    Количество лайков likes выведите в блок .picture__likes.
    Количество комментариев comments выведите в блок .picture__comments.

Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.
*/
import { generatePhotosArray } from './post.js';
const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createdPhotos = generatePhotosArray();

const createdPhotosFragment = document.createDocumentFragment();

const photosList = document.querySelector('.pictures');

createdPhotos.forEach(({url, description, likes, comments}) => {
  const photosParts = picturesTemplate.cloneNode(true);
  photosParts.querySelector('img').src = url;
  photosParts.querySelector('img').alt = description;
  photosParts.querySelector('.picture__likes').textContent = likes;
  photosParts.querySelector('.picture__comments').textContent = comments;
  createdPhotosFragment.append(photosParts);
});
photosList.append(createdPhotosFragment);
