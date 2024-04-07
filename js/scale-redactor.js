
const scaleControlField = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview');
const imgElement = imgPreview.querySelector('img');
const scaleStep = 25;
const scaleMin = 25;
const scaleMax = 100;

let scaleControlFieldNum = parseInt(scaleControlField.value, 10);

const updateScale = () => {
  imgElement.style.transform = `scale(${scaleControlFieldNum / 100})`;
};

const updateValue = () => {
  scaleControlField.value = `${scaleControlFieldNum.toString() }%`;
};

const scaleDec = () => {
  scaleControlFieldNum = parseInt(scaleControlField.value, 10);
  if (scaleControlFieldNum > scaleMin) {
    scaleControlFieldNum -= scaleStep;
    updateScale();
    updateValue();
  }
};

const scaleInc = () => {
  scaleControlFieldNum = parseInt(scaleControlField.value, 10);
  if (scaleControlFieldNum < scaleMax) {
    scaleControlFieldNum += scaleStep;
    updateScale();
    updateValue();
  }
};

export{scaleInc,scaleDec,updateScale,updateValue};
