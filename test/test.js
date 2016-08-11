var assert = require('assert');
var yamlLoader = require('../');

describe('yaml-loader', function() {
  it('return stringify version of the yaml file', function() {
    assert.equal(yamlLoader("---\nhello: world"), '{\n\t"hello": "world"\n}');
  });

  it('return a part of the yaml', function() {
    var context = {
      query: '?namespace=hello'
    };
    assert.equal(yamlLoader.call(context, "---\nhello:\n  world: plop"), '{\n\t"world": "plop"\n}');
  });

  it('return a sub-part of the yaml', function() {
    var context = {
      query: '?namespace=hello.world'
    };
    assert.equal(yamlLoader.call(context, "---\nhello:\n  world: plop"), '"plop"');
  });
});
