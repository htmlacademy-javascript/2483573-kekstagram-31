/*
Для отображения окна нужно удалять класс hidden у элемента .big-picture и каждый раз заполнять его данными о конкретной фотографии:

    Адрес изображения url подставьте как src изображения внутри блока .big-picture__img.

    Количество лайков likes подставьте как текстовое содержание элемента .likes-count.

    Количество показанных комментариев подставьте как текстовое содержание элемента .social__comment-shown-count.

    Общее количество комментариев к фотографии comments подставьте как текстовое содержание элемента .social__comment-total-count.
    Список комментариев под фотографией: комментарии должны вставляться в блок .social__comments. Разметка каждого комментария должна выглядеть так:

<li class="social__comment">
  <img
    class="social__picture"
    src="{{аватар}}"
    alt="{{имя комментатора}}"
    width="35" height="35">
  <p class="social__text">{{текст комментария}}</p>
</li>

    Описание фотографии description вставьте строкой в блок .social__caption.

После открытия окна спрячьте блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader, добавив им класс hidden, с ними мы разберёмся позже, в другом домашнем задании.

После открытия окна добавьте тегу <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле. При закрытии окна не забудьте удалить этот класс.

Напишите код для закрытия окна по нажатию клавиши Esc и клике по иконке закрытия.
*/
const bigPicture = document.querySelector('.big-picture');
const bigPictureElement = document.querySelector('.big-picture__img');
const img = bigPictureElement.querySelector('img');
const likes = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.social__comment-shown-count');
const comentsTotalCount = document.querySelector('.social__comment-total-count');
const caption = document.querySelector('.social__caption');
const socialComments = document.querySelector('.social__comments');
const closeButton = document.querySelector('.big-picture__cancel');
const closeBigPhoto = () => {
  bigPicture.classList.add('hidden');
  document.querySelector('.social__comment-count').classList.remove('hidden');
  document.querySelector('.comments-loader').classList.remove('hidden');
  document.body.classList.remove('modal-open');

};
const onEsc = (evt) => {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    closeBigPhoto();
  }
};


closeButton.addEventListener('click', closeBigPhoto);

const openBigPhoto = (photo) => {
  bigPicture.classList.remove('hidden');
  img.src = photo.url;
  likes.textContent = photo.likes;
  commentsCount.textContent = photo.comments;
  comentsTotalCount.textContent = photo.comments.length;
  caption.textContent = photo.description;
  socialComments.innerHTML = '';
  photo.comments.forEach((comment) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');
    commentElement.innerHTML = `
      <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
      <p class="social__text">${comment.message}</p>
    `;
    socialComments.appendChild(commentElement);
  });
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEsc);
};
export { openBigPhoto };
