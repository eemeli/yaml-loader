var yaml = require('js-yaml');
var loaderUtils = require('loader-utils');
var assign = require('object-assign');

module.exports = function (source) {
  this.cacheable && this.cacheable();

  var opts = assign({
    force: false
  }, loaderUtils.parseQuery(this.query));

  var jsYamlOpts = {
    onWarning: opts.force ? function() {} : null
  };

  var res = yaml.safeLoad(source, jsYamlOpts);
  return JSON.stringify(res, undefined, '\t');
};
