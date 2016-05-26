var yaml = require('js-yaml');

module.exports = function (source) {
  this.cacheable && this.cacheable();
  var options = this.options.yaml;
  options.filename = this.resourcePath;
  var res = yaml.load(source, options);
  return JSON.stringify(res, undefined, '\t');
};
