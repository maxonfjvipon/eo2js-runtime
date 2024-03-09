const assert = require('assert');
const float$gt = require('../../../../temp/objects/org/eolang/float$gt');
const data = require('../../../../temp/runtime/data');
const dataized = require('../../../../temp/runtime/dataized');

describe('float$gt', function() {
  it('should confirm that 7.2 > 3.1', function() {
    assert.equal(
      dataized(
        float$gt(data.toObject(7.2)).with({'x': data.toObject(3.1)}),
        data.BOOL
      ),
      true
    )
  })
  it('should not confirm that 10.4 > 20.1', function() {
    assert.equal(
      dataized(
        float$gt(data.toObject(10.4)).with({'x': data.toObject(20.1)}),
        data.BOOL
      ),
      false
    )
  })
})
