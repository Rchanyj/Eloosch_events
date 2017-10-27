function uniqueKeyGenerator() {
  function generateAlphanumeric(){
    return String.fromCharCode(Math.random()*(122-48)+48).replace(/[\;\:\<\>\?\@\\\`\_\]\[\^\`\=]/, () => generateAlphanumeric())
  }
  let newKey = '';
  for (let i = 0; i < 16; i++){
    newKey += generateAlphanumeric();
  }
  return newKey;
}

module.exports = {
  randomKey : uniqueKeyGenerator
};
