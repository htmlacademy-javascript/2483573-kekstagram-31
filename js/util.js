// Получаем рандом число
const getRandomNumber = function (a, b) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  let previousNumber = null;
  let randomNumber;
  do {
    randomNumber = Math.floor(Math.random() * (upper - lower + 1) + lower);
  } while (randomNumber === previousNumber);
  previousNumber = randomNumber;

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
  const avatarMin = 0;
  const avatarMax = 5;
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

export { getRandomNumber, generateRandomComment };
