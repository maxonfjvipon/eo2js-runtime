const assert = require('assert');
const int$gt = require('../../../../temp/objects/org/eolang/int$gt');
const data = require('../../../../temp/runtime/data');
const dataized = require('../../../../temp/runtime/dataized');

describe('int$gt', function() {
  it('should confirm that 7 > 3', function() {
    assert.equal(
      dataized(
        int$gt(data.toObject(7)).with({'x': data.toObject(3)}),
        data.BOOL
      ),
      true
    )
  })
  it('should not confirm that 10 > 20', function() {
    assert.equal(
      dataized(
        int$gt(data.toObject(10)).with({'x': data.toObject(20)}),
        data.BOOL
      ),
      false
    )
  })
})
