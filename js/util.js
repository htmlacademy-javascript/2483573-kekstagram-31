const uniqueNumbersSet = new Set();


const getRandomNumber = function(a, b) {

  const lower = Math.ceil(Math.min(a, b));

  const upper = Math.floor(Math.max(a, b));


  let randomNumber;

  do {

    randomNumber = Math.floor(Math.random() * (upper - lower + 1) + lower);

  } while (uniqueNumbersSet.has(randomNumber));


  uniqueNumbersSet.add(randomNumber);


  if (uniqueNumbersSet.size === upper - lower + 1) {

    // Reset the set if all numbers in the range have been generated

    uniqueNumbersSet.clear();

  }


  return randomNumber;

};
// Функция для генерации случайного комментария
const generateRandomComment = function () {
  const names = [
    'User-784923',
    'User-246837',
    'User-538492',
    'User-103857',
    'User-762948',
    'User-384729',
    'User-203847',
    'User-594024',
    'User-364920',
    'User-857364',
  ];
  const messages = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  ];
  const avatarMin = 1;
  const avatarMax = 6;
  const getMessageIndex = getRandomNumber(0, messages.length - 1);
  const getNamesIndex = getRandomNumber(0, names.length - 1);
  const comment = {};
  const avatarId = getRandomNumber(avatarMin, avatarMax);
  comment.id = getRandomNumber(1, 150);
  comment.avatar = `img/avatar-${avatarId}.svg`;
  comment.message = messages[getMessageIndex];
  comment.name = names[getNamesIndex];
  return comment;
};


export const comparePhotos = {
  disscused: (photoA,photoB) => {
    const commentLengthA = photoA.comments.length;
    const commentLengthB = photoB.comments.length;

    return commentLengthB - commentLengthA;
  },
  random : (list) => list.map(() => list[getRandomNumber(0,24)]).slice(0,10)
};

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

export function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}
// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_throttle

function throttle (callback, delayBetweenFrames) {
  // Используем замыкания, чтобы время "последнего кадра" навсегда приклеилось
  // к возвращаемой функции с условием, тогда мы его сможем перезаписывать
  let lastTime = 0;

  return (...rest) => {
    // Получаем текущую дату в миллисекундах,
    // чтобы можно было в дальнейшем
    // вычислять разницу между кадрами
    const now = new Date();

    // Если время между кадрами больше задержки,
    // вызываем наш колбэк и перезаписываем lastTime
    // временем "последнего кадра"
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

export { getRandomNumber, generateRandomComment };
