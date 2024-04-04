
const scaleControlField = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview');
const scaleStep = 25;
const scaleMin = 25;
const scaleMax = 100;

let scaleControlFieldNum = parseInt(scaleControlField.value, 10);

const updateScale = () => {
  imgPreview.style.transform = `scale(${scaleControlFieldNum / 100})`;
};

const updateValue = () => {
  scaleControlField.value = `${scaleControlFieldNum.toString() }%`;
};

const scaleDec = () => {
  if (scaleControlFieldNum > scaleMin) {
    scaleControlFieldNum -= scaleStep;
    updateScale();
    updateValue();
  }
};

const scaleInc = () => {
  if (scaleControlFieldNum < scaleMax) {
    scaleControlFieldNum += scaleStep;
    updateScale();
    updateValue();
  }
};

export{scaleInc,scaleDec,updateScale,updateValue};
