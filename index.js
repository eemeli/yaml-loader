var loaderUtils = require('loader-utils');
var YAML = require('yaml');

module.exports = function (source) {
  this.cacheable && this.cacheable();
  try {
    var res = YAML.parse(source);
    var options = loaderUtils.parseQuery(this.query);
    if (options.namespace) {
      res = options.namespace.split('.').reduce(function(acc, name) {
        return acc[name];
      }, res);
    }
    return JSON.stringify(res, undefined, '\t');
  }
  catch (err) {
    this.emitError(err);
    return null;
  }
};
