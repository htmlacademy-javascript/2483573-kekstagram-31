
const scaleControlField = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview');
const imgElement = imgPreview.querySelector('img');
const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

let scaleControlFieldNum = parseInt(scaleControlField.value, 10);

const updateScale = () => {
  imgElement.style.transform = `scale(${scaleControlFieldNum / 100})`;
};

const updateValue = () => {
  scaleControlField.value = `${scaleControlFieldNum.toString() }%`;
};

const scaleDec = () => {
  scaleControlFieldNum = parseInt(scaleControlField.value, 10);
  if (scaleControlFieldNum > SCALE_MIN) {
    scaleControlFieldNum -= SCALE_STEP;
    updateScale();
    updateValue();
  }
};

const scaleInc = () => {
  scaleControlFieldNum = parseInt(scaleControlField.value, 10);
  if (scaleControlFieldNum < SCALE_MAX) {
    scaleControlFieldNum += SCALE_STEP;
    updateScale();
    updateValue();
  }
};

export{scaleInc,scaleDec,updateScale,updateValue};
