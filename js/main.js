// Функция для генерации случайного числа от min до max
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  // Функция для генерации случайного комментария
  function generateRandomComment() {
    const avatars = ['img/avatar-1.svg', 'img/avatar-2.svg', 'img/avatar-3.svg', 'img/avatar-4.svg', 'img/avatar-5.svg', 'img/avatar-6.svg'];
    const messages = [
      'Всё отлично!',
      'В целом всё неплохо. Но не всё.',
      'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
      'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
      'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
      'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
    ];
  
    return {
      id: getRandomNumber(1, 10000),
      avatar: avatars[getRandomNumber(1, 6)],
      message: messages[getRandomNumber(1, 6)],
      name: 'User' + '-' + getRandomNumber(1, 100)
    };
  }
  
  // Функция для создания массива объектов-фотографий
  function generatePhotosArray() {
    const photos = [];
    const usedIds = [];
    const usedUrls = [];
  
    for (let i = 1; i <= 25; i++) {
      const id = getRandomNumber(1, 1000);
      while (usedIds.includes(id)) {
        id = getRandomNumber(1, 1000);
      }
      usedIds.push(id);
  
      const url = 'photos/' + i + '.jpg';
      while (usedUrls.includes(url)) {
        url = 'photos/' + i + '.jpg';
      }
      usedUrls.push(url);
  
      const description = `'Описание фото'${i}`;
      const likes = getRandomNumber(15, 200);
  
      const comments = [];
      const numComments = getRandomNumber(0, 30);
      for (let j = 0; j < numComments; j++) {
        comments.push(generateRandomComment());
      }
  
      photos.push({ id, url, description, likes, comments });
    }
  
    return photos;
  }
  
  const photosArray = generatePhotosArray();
  console.log(photosArray);
  
