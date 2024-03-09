const assert = require('assert');
const int$times = require('../../../../temp/objects/org/eolang/int$times');
const data = require('../../../../temp/runtime/data');
const dataized = require('../../../../temp/runtime/dataized');

describe('int$times', function() {
  it('should multiply two integers', function() {
    assert.equal(
      dataized(
        int$times(data.toObject(3)).with({'x': data.toObject(4)}),
        data.INT
      ),
      12
    )
  })
})
