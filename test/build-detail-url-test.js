'use strict';
var assert = require('power-assert');
var buildDetailUrl = require('../src/build-detail-url');

describe('build-detail-url', function () {
  it('should return detail url', function () {
    var input = 'example';
    var expected = 'https://chromewebstore.google.com/detail/example';
    assert.equal(buildDetailUrl(input), expected);
  });
});
