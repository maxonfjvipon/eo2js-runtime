const assert = require('assert');
const int$div = require('../../../../temp/objects/org/eolang/int$div');
const data = require('../../../../temp/runtime/data');
const dataized = require('../../../../temp/runtime/dataized');

describe('int$div', function() {
  it('should divide two integers', function() {
    assert.equal(
      dataized(
        int$div(data.toObject(42)).with({'x': data.toObject(6)}),
        data.INT
      ),
      7
    )
  })
})
