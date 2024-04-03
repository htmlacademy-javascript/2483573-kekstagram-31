const effectNone = document.querySelector('#effect-none');
const effectChrome = document.querySelector('#effect-chrome');
const effectSepia = document.querySelector('#effect-sepia');
const effectMarvin = document.querySelector('#effect-marvin');
const effectPhobos = document.querySelector('#effect-phobos');
const effectHeat = document.querySelector('#effect-heat');
const imgPreview = document.querySelector('.img-upload__preview');
const imgEffectlevel = document.querySelector('.effect-level__slider');
const imgEffectContainer = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');
const scaleControlField = document.querySelector('.scale__control--value');
imgEffectlevel.classList.add('hidden');

const settings = {
  range: {
    min: 0,
    max: 100,
  },
  step: 1,
  start: 100,
};

noUiSlider.create(imgEffectlevel, settings);
let filterValue = effectLevelValue.value;

const show = () => {
  imgEffectlevel.removeAttribute('disabled', true);
  imgEffectlevel.classList.remove('hidden');
  imgEffectContainer.classList.remove('hidden');
};
const hide = () => {
  imgPreview.style.removeProperty('filter');
  imgEffectlevel.setAttribute('disabled', true);
  imgEffectlevel.classList.add('hidden');
  imgEffectContainer.classList.add('hidden');
};
hide();
const chromeFilter = {
  connect: 'lower',
  range: {
    min: 0,
    max: 1,
  },
  step: 0.1,
  start: 1,
};
const sepiaFilter = {
  connect: 'lower',
  range: {
    min: 0,
    max: 1,
  },
  step: 0.1,
  start: 1,
};
const heatFilter = {
  connect: 'lower',
  range: {
    min: 0,
    max: 3,
  },
  step: 0.1,
  start: 3,
};
const marvinFilter = {
  connect: 'lower',
  range: {
    min: 0,
    max: 100,
  },
  step: 1,
  start: 100,
};
const phobosFilter = {
  connect: 'lower',
  range: {
    min: 0,
    max: 3,
  },
  step: 0.1,
  start: 3,
};


const createChrome = (evt) => {
  evt.preventDefault();
  imgEffectlevel.noUiSlider.destroy();
  noUiSlider.create(imgEffectlevel, chromeFilter);
  show();
  imgEffectlevel.noUiSlider.on('update', () => {
    filterValue = imgEffectlevel.noUiSlider.get();
    imgPreview.style.filter = `grayscale(${filterValue.toString()})`;
    effectLevelValue.value = filterValue;
  });
};
const createSepia = (evt) => {
  evt.preventDefault();
  imgEffectlevel.noUiSlider.destroy();
  noUiSlider.create(imgEffectlevel, sepiaFilter);
  show();
  imgEffectlevel.noUiSlider.on('update', () => {
    filterValue = imgEffectlevel.noUiSlider.get();
    imgPreview.style.filter = `sepia(${filterValue.toString()})`;
    effectLevelValue.value = filterValue;
  });
};
const createHeat = (evt) => {
  evt.preventDefault();
  imgEffectlevel.noUiSlider.destroy();
  noUiSlider.create(imgEffectlevel, heatFilter);
  show();
  imgEffectlevel.noUiSlider.on('update', () => {
    filterValue = imgEffectlevel.noUiSlider.get();
    imgPreview.style.filter = ` brightness(${filterValue.toString()})`;
    effectLevelValue.value = filterValue;
  });
};
const createMarvin = (evt) => {
  evt.preventDefault();
  imgEffectlevel.noUiSlider.destroy();
  noUiSlider.create(imgEffectlevel, marvinFilter);
  show();
  imgEffectlevel.noUiSlider.on('update', () => {
    filterValue = imgEffectlevel.noUiSlider.get();
    imgPreview.style.filter = `invert(${filterValue.toString()}%)`;
    effectLevelValue.value = filterValue;
  });
};
const createPhobos = (evt) => {
  evt.preventDefault();
  imgEffectlevel.noUiSlider.destroy();
  noUiSlider.create(imgEffectlevel, phobosFilter);
  show();
  imgEffectlevel.noUiSlider.on('update', () => {
    filterValue = imgEffectlevel.noUiSlider.get();
    imgPreview.style.filter = `blur(${filterValue.toString()}px)`;
  });
};

effectChrome.addEventListener('change', createChrome);
effectSepia.addEventListener('change', createSepia);
effectHeat.addEventListener('change', createHeat);
effectMarvin.addEventListener('change', createMarvin);
effectNone.addEventListener('change', hide);
effectPhobos.addEventListener('change', createPhobos);
const clear = () => {
  scaleControlField.value = '';
  filterValue = '';
  hide();

};
export{clear};
