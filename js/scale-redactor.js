
const scaleControlField = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview');
const imgElement = imgPreview.querySelector('img');
const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

let scaleControlFieldNum = parseInt(scaleControlField.value, 10);

const scaleUpdateHandler = () => {
  imgElement.style.transform = `scale(${scaleControlFieldNum / 100})`;
};

const valueUpdateHandler = () => {
  scaleControlField.value = `${scaleControlFieldNum.toString() }%`;
};

const onScaleDec = () => {
  scaleControlFieldNum = parseInt(scaleControlField.value, 10);
  if (scaleControlFieldNum > SCALE_MIN) {
    scaleControlFieldNum -= SCALE_STEP;
    scaleUpdateHandler();
    valueUpdateHandler();
  }
};

const onScaleInc = () => {
  scaleControlFieldNum = parseInt(scaleControlField.value, 10);
  if (scaleControlFieldNum < SCALE_MAX) {
    scaleControlFieldNum += SCALE_STEP;
    scaleUpdateHandler();
    valueUpdateHandler();
  }
};

export{onScaleInc,onScaleDec};
