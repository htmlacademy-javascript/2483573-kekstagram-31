
const sendData = (formData) => fetch(
  'https://31.javascript.htmlacademy.pro/kekstagram',
  {
    method: 'POST',
    formData,
  });

export{sendData};
