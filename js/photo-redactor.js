const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlField = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview');
const scaleStep = 25;
const scaleMin = 25;
const scaleMax = 100;

let scaleControlFieldNum = scaleControlField.value;
const scaleSub = () => {
  if(scaleControlFieldNum > scaleMin){
    scaleControlFieldNum -= scaleStep;
  }
};
const scaleInc = () => {
  if(parseInt(scaleControlFieldNum,10) <= scaleMax){
    scaleControlFieldNum += scaleStep;
  }

};
scaleControlSmaller.addEventListener('click',scaleSub);

scaleControlBigger.addEventListener('click', scaleInc);
// const transformScale = toString(scaleControlFieldNum / 100);
// imgPreview.style.transform = transformScale;
