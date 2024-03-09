const assert = require('assert');
const float$times = require('../../../../temp/objects/org/eolang/float$times');
const data = require('../../../../temp/runtime/data');
const dataized = require('../../../../temp/runtime/dataized');

describe('float$times', function() {
  it('should multiply two floats', function() {
    assert.equal(
      dataized(
        float$times(data.toObject(5.5)).with({'x': data.toObject(12.1)}),
        data.FLOAT
      ),
      5.5 * 12.1
    )
  })
})
