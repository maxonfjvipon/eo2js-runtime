const assert = require('assert');
const float$plus = require('../../../../temp/objects/org/eolang/float$plus');
const data = require('../../../../temp/runtime/data');
const dataized = require('../../../../temp/runtime/dataized');

describe('int$plus', function() {
  it('should add two floats', function() {
    assert.equal(
      dataized(
        float$plus(data.toObject(7.1)).with({'x': data.toObject(3.4)}),
        data.FLOAT
      ),
      10.5
    )
  })
})
