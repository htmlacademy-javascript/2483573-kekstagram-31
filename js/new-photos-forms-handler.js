import { sendData } from './api';
import { clear } from './filter-redactor';
import { scaleDec,scaleInc } from './scale-redactor';
const regex = /^#[a-zа-яё0-9]{1,19}$/i;
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadHud = document.querySelector('.img-upload__overlay');
const imgUploadCloseButton = document.querySelector('.img-upload__cancel');
const hashTagsInput = document.querySelector('.text__hashtags');
const uploadForm = document.querySelector('.img-upload__form');
const commentTextArea = document.querySelector('.text__description');
const imgPreview = document.querySelector('.img-upload__preview');
const imgElement = imgPreview.querySelector('img');
const effectPreview = document.querySelectorAll('.effects__preview');
const successWindowTemplate = document.querySelector('#success').content;
const errorWindowTemplate = document.querySelector('#error').content;
const submitButton = document.querySelector('.img-upload__submit');
const scaleControlField = document.querySelector('.scale__control--value');
const successArea = successWindowTemplate.cloneNode(true).querySelector('.success');
const errorArea = errorWindowTemplate.cloneNode(true).querySelector('.error');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const MAX_HASHTAGS = 5;
const ESC_KEYCODE = 27;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});


const validateHashTagsNumber = (value) => {
  const hashTagsArr = value.split(' ');
  const filteredArr = hashTagsArr.filter(Boolean);
  return filteredArr.length <= MAX_HASHTAGS;
};
const validateHashTagsText = (value) => {
  const hashTagsArr = value.split(' ');
  const filteredArr = hashTagsArr.filter(Boolean);
  if (hashTagsInput.value !== '') {
    return filteredArr.every((element) => regex.test(element));
  }
  return true;
};
const maxCommentLength = 140;
const validateComments = (value) => value.length <= maxCommentLength;
const validateUniqueHashTags = (value) => {
  const hashTagsArr = value.split(' ');
  const filteredArr = hashTagsArr.filter(Boolean);
  const lowerCaseHashTagsArr = filteredArr.map((tag) => tag.toLowerCase());
  const duplicates =
    new Set(lowerCaseHashTagsArr).size !== lowerCaseHashTagsArr.length;
  if (duplicates) {
    return false;
  }
  return true;
};

pristine.addValidator(
  hashTagsInput,
  validateUniqueHashTags,
  'Хэштеги не должны повторяться '
);
pristine.addValidator(
  commentTextArea,
  validateComments,
  'Max length коментария 140 symbols'
);
pristine.addValidator(
  hashTagsInput,
  validateHashTagsText,
  'Хеш-тег не может содержать пробелы, спецсимволы, символы пунктуации, эмодзи и др. Максимальная длина одного хеш-тега - 20 символов, включая решетку.',
  false
);
pristine.addValidator(
  hashTagsInput,
  validateHashTagsNumber,
  'Максимум 5 хэштегов братик'
);

const imgUploadClose = () => {
  imgUploadHud.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgUploadInput.value = '';
  hashTagsInput.value = '';
  commentTextArea.value = '';
  scaleControlField.value = '100%';
  imgElement.style.transform = `scale(${1})`;
  clear();
  pristine.reset();
  scaleControlSmaller.removeEventListener('click', scaleDec);
  scaleControlBigger.removeEventListener('click', scaleInc);
};

const checkFocusOnInputFields = () =>
  document.activeElement === hashTagsInput ||
  document.activeElement === commentTextArea;
const checkOnEsc = (evt) => {
  if (evt.keyCode === ESC_KEYCODE && !checkFocusOnInputFields() && !document.body.contains(errorArea)) {
    evt.preventDefault();
    imgUploadClose();
  }
};
const loadPreviews = () => {
  const file = imgUploadInput.files[0];
  const imgUrl = URL.createObjectURL(file);
  imgPreview.querySelector('img').src = imgUrl;
  effectPreview.forEach((element) => {
    element.style.backgroundImage = `url(${imgUrl})`;
  });


};
const openPhotoEditor = (evt) => {
  evt.preventDefault();
  scaleControlField.value = '100%';
  imgUploadHud.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', checkOnEsc);
  scaleControlSmaller.addEventListener('click', scaleDec);
  scaleControlBigger.addEventListener('click', scaleInc);
  clear();
  loadPreviews();

  imgUploadCloseButton.addEventListener('click', imgUploadClose);
};
imgUploadInput.addEventListener('change', openPhotoEditor);


const closeErrorWindow = () => {

  document.body.removeChild(errorArea);


};
const closeSuccessWindow = () => {

  document.body.removeChild(successArea);
  imgUploadClose();
};

const checkNClose = (evt) => {

  if (document.body.contains(successArea) && (evt.keyCode === ESC_KEYCODE || !evt.target.closest('.success__inner') || evt.target.closest('.success__button'))) {
    document.removeEventListener('keydown', checkNClose);
    document.body.removeEventListener('click', checkNClose);
    closeSuccessWindow();
  } else if (document.body.contains(errorArea) && (evt.keyCode === ESC_KEYCODE || !evt.target.closest('.error__inner') || evt.target.closest('.error__button'))) {
    document.removeEventListener('keydown', checkNClose);
    document.body.removeEventListener('click', checkNClose);
    closeErrorWindow();
  }
};
const showSuccessWindow = () => {
  document.body.appendChild(successArea);


  document.addEventListener('keydown', checkNClose);
  document.body.addEventListener('click', checkNClose);
};

const showErrorWindow = () => {

  document.body.appendChild(errorArea);

  document.addEventListener('keydown', checkNClose);
  document.body.addEventListener('click', checkNClose);
};


const blockButton = () => {
  submitButton.setAttribute('disabled', true);
};

const unblockButton = () => {
  submitButton.removeAttribute('disabled');
};

const sendFormData = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockButton();
      const formData = new FormData(evt.target);

      sendData(formData)
        .then(() => {
          imgUploadClose();
          onSuccess();
        })
        .catch(showErrorWindow)

        .finally(unblockButton);

    }
  });
};

export{sendFormData,showSuccessWindow};
