import{getRandomNumber,generateRandomComment} from './util.js'

  // Функция для создания массива объектов-фотографий
  export default function generatePhotosArray() {
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
  export{generatePhotosArray}