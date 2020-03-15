var loaderUtils = require('loader-utils');
var YAML = require('yaml');

module.exports = function (source) {
  var res = YAML.parse(source);
  var options = loaderUtils.getOptions(this) || {};
  if (options.namespace) {
    res = options.namespace.split('.').reduce(function(acc, name) {
      return acc[name];
    }, res);
  }
  return JSON.stringify(res, undefined, '\t');
};
