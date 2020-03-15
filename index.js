var YAML = require('yaml');

module.exports = function (source) {
  this.cacheable && this.cacheable();
  try {
    var res = YAML.parse(source);
    return JSON.stringify(res, undefined, '\t');
  }
  catch (err) {
    this.emitError(err);
    return null;
  }
};
