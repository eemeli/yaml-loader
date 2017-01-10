var yaml = require('js-yaml');

module.exports = function (source) {
  this.cacheable && this.cacheable();
  var res = yaml.safeLoad(source);
  var value = typeof res === "string" ? JSON.parse(res) : res;
  this.value = [value];
  return "module.exports = " + JSON.stringify(value, undefined, "\t") + ";";
};
