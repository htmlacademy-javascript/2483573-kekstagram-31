const imgUploadHud = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
imgUploadHud.classList.remove('hidden');
body.classList.add('modal-open');
const effectNone = document.querySelector('#effect-none');
const effectChrome = document.querySelector('#effect-chrome');
const effectSepia = document.querySelector('#effect-serpia');
const effectMarvin = document.querySelector('#effect-marvin');
const effectPhobos = document.querySelector('#effect-phobos');
const effectHeat = document.querySelector('#effect-heat');
const effectLevelValue = document.querySelector('.effect-level__value');
const imgPreview = document.querySelector('.img-upload__preview');
const imgEffectlevel = document.querySelector('.img-upload__effect-level');

let settings = {
  range:{
    min:0,
    max:100,
  },
  step:1,
  start:100
};
let filterValue = effectLevelValue.value;

const chromeSettings = (Event) =>{
  Event.preventDefault();
  settings =
      {
        range:{
          min:0,
          max:1,
        },
        step:0.1,
        start:1
      };
  imgPreview.style.filter = `grayscale${filterValue.toString()}`;
};
const sepiaSettings = (Event) =>{
  Event.preventDefault();
  settings =
      {
        range:{
          min:0,
          max:1,
        },
        step:0.1,
        start:1
      };
  imgPreview.style.filter = `sepia${filterValue.toString()}`;
};
const heatSettins = (Event) => {
  Event.preventDefault();
  settings =
    {
      range:{
        min:0,
        max:3,
      },
      step:0.1,
      start:1
    };
  imgPreview.style.filter = `brightness${filterValue.toString()}`;
};
const phobosSettings = (Event) => {
  Event.preventDefault();
  settings =
    {
      range:{
        min:`${0}px`,
        max:`${3}px`,
      },
      step:`${0.1}px`,
      start:`${3}px`
    };
  imgPreview.style.filter = `blur${filterValue.toString()}`;

};
const marvinSettings = (Event) => {
  Event.preventDefault();
  settings =
      {
        range:{
          min:`${0}%`,
          max:`${100}%`,
        },
        step:`${1}%`,
        start:`${100}%`
      };
  imgPreview.style.filter = `invert${filterValue.toString()}`;
};
const noneSettings = (Event) => {
  Event.preventDefault();
  imgPreview.style.removeProperty('filter');
  imgEffectlevel.classList.add('hidden');
};
// const filterSliderSetting = () =>{
//   if(Event.target === effectChrome){
//     chromeSettings();
//   } else if(Event.target === effectSepia){
//     sepiaSettings();
//   } else if (Event.target === effectHeat){
//     heatSettins();
//   } else if (Event.target === effectPhobos){
//     phobosSettings();
//   } else if(Event.target === effectMarvin){
//     marvinSettings();
//   } else if (Event.target === effectNone){
//     noneSettings();
//   }
//
//};
// const effectChrome = document.querySelector('#effect-chtome');
// const effectSepia = document.querySelector('#effect-serpia');
// const effectMarvin = document.querySelector('#effect-marvin');
// const effectPhobos = document.querySelector('#effect-phobos');
// const effectHeat = document.querySelector('#effect-heat');
noUiSlider.create(imgEffectlevel,settings);
imgEffectlevel.noUiSlider.on('update', () => {
  filterValue = imgEffectlevel.noUiSlider.get();
});


effectChrome.addEventListener('focus',chromeSettings());
effectSepia.addEventListener('focus',sepiaSettings());
effectHeat.addEventListener('focus',heatSettins());
effectPhobos.addEventListener('focus',phobosSettings());
effectMarvin.addEventListener('focus',marvinSettings());
effectNone.addEventListener('focus',noneSettings());
