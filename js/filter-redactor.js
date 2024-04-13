const SETTINGS = {
  none: {
    options: {
      range: {
        min: 0,
        max: 100,
      },
      step: 1,
      start: 100,
    },
    getFilterValue: () => '',
  },
  chrome: {
    options: {
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
      start: 1,
    },
    getFilterValue: (value) => `grayscale(${value})`,
    connect: 'lower',

  },
  sepia: {
    options: {
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
      start: 1,
    },
    getFilterValue: (value) => `sepia(${value})`,
    connect: 'lower',

  },
  heat: {
    options: {
      range: {
        min: 1,
        max: 3,
      },
      step: 0.1,
      start: 3,
    },
    getFilterValue: (value) => `brightness(${value})`,
    connect: 'lower',

  },
  marvin: {
    connect: 'lower',
    options: {
      range: {
        min: 0,
        max: 100,
      },
      step: 1,
      start: 100,
    },
    getFilterValue: (value) => `invert(${value}%)`
  },
  phobos: {
    connect: 'lower',
    options: {
      range: {
        min: 0,
        max: 3,
      },
      step: 0.1,
      start: 3,
    },
    getFilterValue: (value) => `blur(${value}px)`
  }
};

const effectsInput = document.querySelectorAll('.effects__radio');
const effectNone = document.querySelector('#effect-none');
const imgPreview = document.querySelector('.img-upload__preview');
const imgElement = imgPreview.querySelector('img');
const imgEffectlevel = document.querySelector('.effect-level__slider');
const imgEffectContainer = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');


let filterValue = effectLevelValue.value;

const show = () => {
  imgEffectlevel.removeAttribute('disabled', true);
  imgEffectlevel.classList.remove('hidden');
  imgEffectContainer.classList.remove('hidden');
};
const uiSliderHideHandler = () => {
  imgElement.style.filter = 'none ';
  imgEffectlevel.setAttribute('disabled', true);
  imgEffectlevel.classList.add('hidden');
  imgEffectContainer.classList.add('hidden');
};
const clear = () => {
  filterValue = '';
  imgElement.style.filter = 'none';
  uiSliderHideHandler();
  effectNone.checked = true;
};
noUiSlider.create(imgEffectlevel, SETTINGS.none.options);

const updateEffectHandler = (effect) => {
  imgEffectlevel.noUiSlider.destroy();
  noUiSlider.create(imgEffectlevel, SETTINGS[effect].options);
  show();
  imgEffectlevel.noUiSlider.on('update', () => {
    filterValue = +imgEffectlevel.noUiSlider.get();
    imgElement.style.filter = SETTINGS[effect].getFilterValue(filterValue);
    effectLevelValue.value = filterValue;
  });
};
const changeFilterHandler = (evt) => {
  evt.preventDefault();
  const currentEffect = document.querySelector('input[name="effect"]:checked').value;
  updateEffectHandler(currentEffect);
  if(effectNone.checked){
    uiSliderHideHandler();
  }
};


uiSliderHideHandler();
effectsInput.forEach((item) => {
  item.addEventListener('change', changeFilterHandler);
});


export{clear};
