const regex = /^#[a-zа-яё0-9]{1,19}$/i;
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadHud = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const imgUploadCloseButton = document.querySelector('.img-upload__cancel');
const hashTagsInput = document.querySelector('.text__hashtags');
const uploadForm = document.querySelector('.img-upload__form');
const commentTextArea = document.querySelector('.text__description');
// const hashTagsArr = hashTagsInput.value.split(',');


const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent:'img-upload__field-wrapper', // Элемент, на который будут добавляться классы
  errorTextClass: 'img-upload__field-wrapper--error', // Класс, обозначающий невалидное поле
});


const hashTagsArrMaxLength = 5;
const validateHashTagsNumber = (value) => {
  const hashTagsArr = value.split(' ');
  return hashTagsArr.length !== hashTagsArrMaxLength;
};
const validateHashTagsText = (value) => {
  const hashTagsArr = value.split(' ');
  if(hashTagsInput.value !== '') {
    return hashTagsArr.every((element) => regex.test(element));
  }
  return true;
};
const maxCommentLength = 140;
const validateComments = (value) => value.length !== maxCommentLength;
const validateUniqueHashTags = (value) => {
  const hashTagsArr = value.split(' ');
  const lowerCaseHashTagsArr = hashTagsArr.map((tag) => tag.toLowerCase());
  const duplicates = new Set(lowerCaseHashTagsArr).size !== lowerCaseHashTagsArr.length;
  if (duplicates) {
    return false;
  }
  return true; // Add this line to return true if no duplicates are found

};

pristine.addValidator(hashTagsInput,validateUniqueHashTags,'Хэштеги не должны повторяться ');
pristine.addValidator(commentTextArea,
  validateComments,
  'Max length коментария 140 symbols');
pristine.addValidator(hashTagsInput,
  validateHashTagsText,
  'Хеш-тег не может содержать пробелы, спецсимволы, символы пунктуации, эмодзи и др. Максимальная длина одного хеш-тега - 20 символов, включая решетку.',false);
pristine.addValidator(hashTagsInput,validateHashTagsNumber,'Максимум 5 хэштегов братик');


const imgUploadClose = () => {

  imgUploadHud.classList.add('hidden');
  body.classList.remove('modal-open');
  imgUploadInput.value = '';
  hashTagsInput.value = '';
  commentTextArea.value = '';
};

const checkFocusOnInputFields = () => document.activeElement === hashTagsInput || document.activeElement === commentTextArea;
const onEsc = (evt) => {
  if (evt.keyCode === 27 && !checkFocusOnInputFields()) {
    evt.preventDefault();
    imgUploadClose();
  }
};
const openPhotoEditor = (evt) => {
  evt.preventDefault();
  imgUploadHud.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown',onEsc);
  imgUploadCloseButton.addEventListener('click', imgUploadClose);

};
imgUploadInput.addEventListener('change', openPhotoEditor);


uploadForm.addEventListener('submit',(event) => {
  event.preventDefault();
  const isValid = pristine.validate();
  if(isValid){
    uploadForm.submit();
  }
});
