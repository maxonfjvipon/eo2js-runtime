const assert = require('assert');
const float$div = require('../../../../temp/objects/org/eolang/float$div');
const data = require('../../../../temp/runtime/data');
const dataized = require('../../../../temp/runtime/dataized');

describe('float$div', function() {
  it('should divide two floats', function() {
    assert.equal(
      dataized(
        float$div(data.toObject(13.2)).with({'x': data.toObject(5.7)}),
        data.FLOAT
      ),
      13.2 / 5.7
    )
  })
  it('should not fail on division by zero', function() {
    assert.doesNotThrow(
      () => dataized(
        float$div(data.toObject(13.2)).with({'x': data.toObject(0.0)}),
        data.FLOAT
      )
    )
  });
})
