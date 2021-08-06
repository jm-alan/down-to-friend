/* eslint-disable no-extend-native */
Array.prototype.toKeyedObject = function (key) {
  return this.reduce((acc, next) => (acc[next[key]] = next) && acc, {});
};
