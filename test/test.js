var assert = require('assert');
var yamlLoader = require('../');

describe('yaml-loader', function() {
  it('return stringify version of the yaml file', function() {
    assert.equal(yamlLoader("---\nhello: world"), '{\n\t"hello": "world"\n}');
  });

  it('emit error if there is a parse error', function() {
    var called = 0;
    var context = {emitError: function() {
      called++;
    }};
    assert.equal(yamlLoader.call(context, ("---\nhello: world\nhello: 2")), null);
    assert.equal(called, 1);
  });
});
