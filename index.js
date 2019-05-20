var yaml = require('js-yaml');

module.exports = function (source) {
  this.cacheable && this.cacheable();
  try {
    var res = yaml.safeLoadAll(source);
    return JSON.stringify(res, undefined, '\t');
  }
  catch (err) {
    this.emitError(err);
    return null;
  }
};
