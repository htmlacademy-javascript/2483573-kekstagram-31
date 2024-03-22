const imgUploadHud = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
imgUploadHud.classList.remove('hidden');
body.classList.add('modal-open');

const effectNone = document.querySelector('#effect-none');
const effectChrome = document.querySelector('#effect-chrome');
const effectSepia = document.querySelector('#effect-sepia');
const effectMarvin = document.querySelector('#effect-marvin');
const effectPhobos = document.querySelector('#effect-phobos');
const effectHeat = document.querySelector('#effect-heat');

const imgPreview = document.querySelector('.img-upload__preview');
const imgEffectlevel = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');
imgEffectlevel.classList.add('hidden');
let settings = {
  range: {
    min: 0,
    max: 100,
  },
  step: 1,
  start: 100
};

let filterValue = effectLevelValue.value;

const noneSettings = (Event) => {
  Event.preventDefault();
  imgPreview.style.removeProperty('filter');
  imgEffectlevel.setAttribute('disabled', true);
  imgEffectlevel.classList.add('hidden');
};

const chromeSettings = (Event) => {
  Event.preventDefault();
  settings = {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 1
  };
  imgPreview.style.filter = `grayscale(${filterValue.toString()})`;
  imgEffectlevel.removeAttribute('disabled', true);
  imgEffectlevel.classList.remove('hidden');
};

const sepiaSettings = (Event) => {
  Event.preventDefault();
  settings = {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 1
  };
  imgPreview.style.filter = `sepia(${filterValue.toString()})`;
  imgEffectlevel.removeAttribute('disabled', true);
  imgEffectlevel.classList.remove('hidden');
};

const heatSettings = (Event) => {
  Event.preventDefault();
  settings = {
    range: {
      min: 0,
      max: 3,
    },
    step: 0.1,
    start: 1
  };
  imgPreview.style.filter = `brightness(${filterValue.toString()})`;
  imgEffectlevel.removeAttribute('disabled', true);
  imgEffectlevel.classList.remove('hidden');
};

const phobosSettings = (Event) => {
  Event.preventDefault();
  settings = {
    range: {
      min: `${0}px`,
      max: `${3}px`,
    },
    step: `${0.1}px`,
    start: `${3}px`,
  };
  imgPreview.style.filter = `blur(${filterValue.toString()})`;
  imgEffectlevel.removeAttribute('disabled', true);
  imgEffectlevel.classList.remove('hidden');
};

const marvinSettings = (Event) => {
  Event.preventDefault();
  settings = {
    range: {
      min: `${0}%`,
      max: `${100}%`,
    },
    step: `${1}%`,
    start: `${100}%`
  };
  imgPreview.style.filter = `invert(${filterValue.toString()})`;
  imgEffectlevel.removeAttribute('disabled', true);
  imgEffectlevel.classList.remove('hidden');
};


noUiSlider.create(imgEffectlevel, settings);

imgEffectlevel.noUiSlider.on('update', () => {
  filterValue = imgEffectlevel.noUiSlider.get();
});


effectChrome.addEventListener('click', chromeSettings);
effectSepia.addEventListener('click', sepiaSettings);
effectHeat.addEventListener('click', heatSettings);
effectPhobos.addEventListener('click', phobosSettings);
effectMarvin.addEventListener('click', marvinSettings);
effectNone.addEventListener('click', noneSettings);
