var yaml = require('js-yaml');
var loaderUtils = require('loader-utils');

module.exports = function (source) {
  this.cacheable && this.cacheable();
  try {
    var res = yaml.safeLoad(source);
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
