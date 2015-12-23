function hash (string) {
  var hash = 0,
      char;
  if (string.length == 0) return hash;
  for (i = 0; i < string.length; i++) {
    char = string.charCodeAt(i);
    hash = ((hash<<5)-hash)+char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

function getURI(str){
  var result = hash(str);
  return result.toString(27)
}

module.exports = {
  getURI: getURI,
  hash: hash
};
