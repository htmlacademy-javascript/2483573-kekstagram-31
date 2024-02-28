function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}
// eslint-disable-next-line no-console
console.log(checkStringLength('Там бля то бля о бля уо бля вуэдаыжа',10));

function isPalindrome(str) {
  const cleanStr = str.replace(/\s/g, '').toLowerCase();
  for (let i = 0; i < cleanStr.length / 2; i++) {
    if (cleanStr[i] !== cleanStr[cleanStr.length - 1 - i]) {
      return false;
    }
  }

  return true;
}
