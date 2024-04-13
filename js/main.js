
import { loadPhotos,showDataErrorMessage } from './load-photos.js';
import { sendFormData , showSuccessWindow} from './new-photos-forms-handler.js';
import { getData } from './api.js';

const imgFilter = document.querySelector('.img-filters');
getData()
  .then((loadedPhotos) => {
    loadPhotos(loadedPhotos);
    imgFilter.classList.remove('img-filters--inactive');
  })
  .catch(
    () => showDataErrorMessage()
  );
sendFormData(showSuccessWindow);


