const regex = /^#[a-zа-яё0-9]{1,19}$/igm;
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadHud = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const imgUploadCloseButton = document.querySelector('.img-upload__cancel');
const hashTagsInput = document.querySelector('.text__hashtags');
const uploadForm = document.querySelector('.img-upload__form');
const commentTextArea = document.querySelector('.text__description');
// const hashTagsArr = hashTagsInput.value.split(',');


const removeOnEsc = (event) => {
  event.stopPropagation();
};

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
  return hashTagsArr.every((element) => regex.test(element));

};
const maxCommentLength = 140;
const commentTextAreaValue = commentTextArea.value;
const validateComments = () => commentTextAreaValue.length !== maxCommentLength;
const validateUniqueHashTags = (value) => {
  const hashTagsArr = value.split(' ');
  const dublicates = new Set(hashTagsArr).size !== hashTagsArr.length;
  if(dublicates){
    return false;
  }
  return true;
};

pristine.addValidator(hashTagsInput,validateUniqueHashTags,'Хэштеги не должны повторяться ',false);
pristine.addValidator(commentTextArea,
  validateComments,
  'Max length коментария 140 symbols',false);
pristine.addValidator(hashTagsInput,
  validateHashTagsText,
  'Хеш-тег не может содержать пробелы, спецсимволы, символы пунктуации, эмодзи и др. Максимальная длина одного хеш-тега - 20 символов, включая решетку.',false);
pristine.addValidator(hashTagsInput,validateHashTagsNumber,'Максимум 5 хэштегов братик',false);


const imgUploadClose = (evt) => {
  evt.preventDefault();
  imgUploadHud.classList.add('hidden');
  body.classList.remove('modal-open');
  imgUploadInput.value = '';
  hashTagsInput.value = '';
  commentTextArea.value = '';
};
// const onEsc = (evt) => {
//   if (evt.keyCode === 27) {
//     evt.preventDefault();
//     imgUploadClose();
//   }
// };
const openPhotoEditor = (evt) => {
  evt.preventDefault();
  imgUploadHud.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown',(e) => {
    if (e.keyCode === 27) {
      e.preventDefault();
      imgUploadClose();
    }
  });
  imgUploadCloseButton.addEventListener('click', imgUploadClose);

};
hashTagsInput.addEventListener('focus',removeOnEsc);
commentTextArea.addEventListener('focus',removeOnEsc);
imgUploadInput.addEventListener('change', openPhotoEditor);


uploadForm.addEventListener('submit',(evt) => {
  evt.preventDefault();
  pristine.validate();
});
