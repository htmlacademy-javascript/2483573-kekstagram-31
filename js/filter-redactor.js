const Settings = {
  range: {
    min: 0,
    max: 100,
  },
  step: 1,
  start: 100,
};

const ChromeFilter = {
  connect: 'lower',
  range: {
    min: 0,
    max: 1,
  },
  step: 0.1,
  start: 1,
};
const SepiaFilter = {
  connect: 'lower',
  range: {
    min: 0,
    max: 1,
  },
  step: 0.1,
  start: 1,
};
const HeatFilter = {
  connect: 'lower',
  range: {
    min: 0,
    max: 3,
  },
  step: 0.1,
  start: 3,
};
const MarvinFilter = {
  connect: 'lower',
  range: {
    min: 0,
    max: 100,
  },
  step: 1,
  start: 100,
};
const PhobosFilter = {
  connect: 'lower',
  range: {
    min: 0,
    max: 3,
  },
  step: 0.1,
  start: 3,
};
const effectNone = document.querySelector('#effect-none');
const effectChrome = document.querySelector('#effect-chrome');
const effectSepia = document.querySelector('#effect-sepia');
const effectMarvin = document.querySelector('#effect-marvin');
const effectPhobos = document.querySelector('#effect-phobos');
const effectHeat = document.querySelector('#effect-heat');
const imgPreview = document.querySelector('.img-upload__preview');
const imgElement = imgPreview.querySelector('img');
const imgEffectlevel = document.querySelector('.effect-level__slider');
const imgEffectContainer = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');


noUiSlider.create(imgEffectlevel, Settings);
let filterValue = effectLevelValue.value;

const show = () => {
  imgEffectlevel.removeAttribute('disabled', true);
  imgEffectlevel.classList.remove('hidden');
  imgEffectContainer.classList.remove('hidden');
};
const uiSliderhideHandler = () => {
  imgElement.style.filter = 'none ';
  imgEffectlevel.setAttribute('disabled', true);
  imgEffectlevel.classList.add('hidden');
  imgEffectContainer.classList.add('hidden');
};
const clear = () => {
  filterValue = '';
  imgElement.style.filter = 'none';
  uiSliderhideHandler();
  effectNone.checked = true;


  const chromeClickHandler = (evt) => {
    evt.preventDefault();
    imgEffectlevel.noUiSlider.destroy();
    noUiSlider.create(imgEffectlevel, ChromeFilter);
    show();
    imgEffectlevel.noUiSlider.on('update', () => {
      filterValue = +imgEffectlevel.noUiSlider.get();
      imgElement.style.filter = `grayscale(${filterValue.toString()})`;
      effectLevelValue.value = filterValue;
    });
  };
  const sepiaClickHandler = (evt) => {
    evt.preventDefault();
    imgEffectlevel.noUiSlider.destroy();
    noUiSlider.create(imgEffectlevel, SepiaFilter);
    show();
    imgEffectlevel.noUiSlider.on('update', () => {
      filterValue = +imgEffectlevel.noUiSlider.get();
      imgElement.style.filter = `sepia(${filterValue.toString()})`;
      effectLevelValue.value = filterValue;
    });
  };
  const heatClickHandler = (evt) => {
    evt.preventDefault();
    imgEffectlevel.noUiSlider.destroy();
    noUiSlider.create(imgEffectlevel, HeatFilter);
    show();
    imgEffectlevel.noUiSlider.on('update', () => {
      filterValue = +imgEffectlevel.noUiSlider.get();
      imgElement.style.filter = ` brightness(${filterValue.toString()})`;
      effectLevelValue.value = filterValue;
    });
  };
  const marvinClickHandler = (evt) => {
    evt.preventDefault();
    imgEffectlevel.noUiSlider.destroy();
    noUiSlider.create(imgEffectlevel, MarvinFilter);
    show();
    imgEffectlevel.noUiSlider.on('update', () => {
      filterValue = +imgEffectlevel.noUiSlider.get();
      imgElement.style.filter = `invert(${filterValue.toString()}%)`;
      effectLevelValue.value = filterValue;
    });
  };
  const phobosClickHandler = (evt) => {
    evt.preventDefault();
    imgEffectlevel.noUiSlider.destroy();
    noUiSlider.create(imgEffectlevel, PhobosFilter);
    show();
    imgEffectlevel.noUiSlider.on('update', () => {
      filterValue = +imgEffectlevel.noUiSlider.get();
      imgElement.style.filter = `blur(${filterValue.toString()}px)`;
    });
  };

  uiSliderhideHandler();
  imgEffectlevel.classList.add('hidden');
  effectChrome.addEventListener('change', chromeClickHandler);
  effectSepia.addEventListener('change', sepiaClickHandler);
  effectHeat.addEventListener('change', heatClickHandler);
  effectMarvin.addEventListener('change', marvinClickHandler);
  effectNone.addEventListener('change', uiSliderhideHandler);
  effectPhobos.addEventListener('change', phobosClickHandler);

};
export{clear};
