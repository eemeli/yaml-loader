var loaderUtils = require('loader-utils');
var YAML = require('yaml');

module.exports = function (source) {
  const options = Object.assign(
    { prettyErrors: true },
    loaderUtils.getOptions(this)
  );
  let res = YAML.parse(source, options);
  if (options.namespace) {
    res = options.namespace.split('.').reduce(function(acc, name) {
      return acc[name];
    }, res);
  }
  return JSON.stringify(res);
};
