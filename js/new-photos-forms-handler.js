import { sendData } from './api';
const regex = /^#[a-zа-яё0-9]{1,19}$/i;
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadHud = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const imgUploadCloseButton = document.querySelector('.img-upload__cancel');
const hashTagsInput = document.querySelector('.text__hashtags');
const uploadForm = document.querySelector('.img-upload__form');
const commentTextArea = document.querySelector('.text__description');
const imgPreview = document.querySelector('.img-upload__preview');
const effectPreview = document.querySelectorAll('.effects__preview');
const successWindowTemplate = document.querySelector('#success').content;
const errorWindowTemplate = document.querySelector('#error').content;
const effectLevelValue = document.querySelector('.effect-level__value').value;
const submitButton = document.querySelector('.img-upload__submit');

const checkEsc = (evt) => {
  if (evt.keyCode === 27) {
    return true;
  }
  return false;
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const hashTagsArrMaxLength = 5;
const validateHashTagsNumber = (value) => {
  const hashTagsArr = value.split(' ');
  return hashTagsArr.length !== hashTagsArrMaxLength;
};
const validateHashTagsText = (value) => {
  const hashTagsArr = value.split(' ');
  if (hashTagsInput.value !== '') {
    return hashTagsArr.every((element) => regex.test(element));
  }
  return true;
};
const maxCommentLength = 140;
const validateComments = (value) => value.length <= maxCommentLength;
const validateUniqueHashTags = (value) => {
  const hashTagsArr = value.split(' ');
  const lowerCaseHashTagsArr = hashTagsArr.map((tag) => tag.toLowerCase());
  const duplicates =
    new Set(lowerCaseHashTagsArr).size !== lowerCaseHashTagsArr.length;
  if (duplicates) {
    return false;
  }
  return true; // Add this line to return true if no duplicates are found
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
  body.classList.remove('modal-open');
  imgUploadInput.value = '';
  hashTagsInput.value = '';
  commentTextArea.value = '';
};

const checkFocusOnInputFields = () =>
  document.activeElement === hashTagsInput ||
  document.activeElement === commentTextArea;
const onEsc = (evt) => {
  if (checkEsc && !checkFocusOnInputFields()) {
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
  imgUploadHud.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEsc);
  loadPreviews();

  imgUploadCloseButton.addEventListener('click', imgUploadClose);
};
imgUploadInput.addEventListener('change', openPhotoEditor);
let successArea = successWindowTemplate.cloneNode(true);
let errorArea = errorWindowTemplate.cloneNode(true);


const closeErrorWindow = () => {
  errorArea = document.querySelector('.error');
  body.removeChild(errorArea);
  imgUploadClose();
};
const closeSuccessWindow = () => {
  successArea = document.querySelector('.success');
  body.removeChild(successArea);
  imgUploadClose();
};

const checkNClose = (evt) => {
  const errorButton = document.querySelector('.error__button');
  const successButton = document.querySelector('.success__button');
  if (checkEsc || evt.target !== successArea || evt.target.closest(successButton)) {
    closeSuccessWindow();
    document.removeEventListener('keydown', checkNClose);
    document.body.removeEventListener('click', checkNClose);
  } else if (checkEsc || evt.target !== errorArea || evt.target.closest(errorButton)) {
    closeErrorWindow();
    document.removeEventListener('keydown', checkNClose);
    document.body.removeEventListener('click', checkNClose);
  }
};
const showErrorWindow = (evt) => {
  body.appendChild(errorArea);
  checkNClose(evt);
  // const errorButton = document.querySelector('.error__button');
  // const checkNClose = (e) => {
  //   e.preventDefault();
  //   if (checkEsc || e.target !== errorArea || e.target.closest(errorButton)) {
  //     closeErrorWindow();
  //     document.removeEventListener('keydown', checkNClose);
  //     document.body.removeEventListener('click', checkNClose);
  //   }
  // };

  document.addEventListener('keydown', checkNClose);
  document.body.addEventListener('click', checkNClose);
};


const showSuccessWindow = (evt) => {
  body.appendChild(successArea);
  checkNClose(evt);
  // const successButton = document.querySelector('.success__button');
  // const checkNClose = (e) => {
  //   e.preventDefault();
  //   if (checkEsc || e.target !== successArea || e.target.closest(successButton)) {
  //     closeSuccessWindow();
  //     document.removeEventListener('keydown', checkNClose);
  //     document.body.removeEventListener('click', checkNClose);
  //   }
  // };

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

      formData.append('effectLevel', effectLevelValue);
      formData.append('comments', commentTextArea.value);
      formData.append('hashtags', hashTagsInput.value);

      sendData(formData)
        .then(onSuccess)
        .catch(showErrorWindow())
        .finally(unblockButton());
    }
  });
};
sendFormData(showSuccessWindow);
