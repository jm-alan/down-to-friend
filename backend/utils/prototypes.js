/* eslint-disable no-extend-native */
Array.prototype.toKeyedObject = function (key) {
  return this.reduce((acc, next) => (acc[next[key]] = next) && acc, {});
};

Array.prototype.asyncForEach = async function ($) {
  for (let _ = 0; _ < this.length; _++) {
    await $(this[_], _, this);
  }
};

Array.prototype.asyncMapInPlace = async function ($) {
  for (let _ = 0; _ < this.length; _++) {
    this[_] = await $(this[_], _, this);
  }
};

Array.prototype.toKeyedObject = function (key) {
  return this.reduce((acc, next) => (acc[next[key]] = next) && acc, {});
};
