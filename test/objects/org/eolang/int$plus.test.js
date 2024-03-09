const assert = require('assert');
const int$plus = require('../../../../temp/objects/org/eolang/int$plus');
const data = require('../../../../temp/runtime/data');
const dataized = require('../../../../temp/runtime/dataized');

describe('int$plus', function() {
  it('should add two integers', function() {
    assert.equal(
      dataized(
        int$plus(data.toObject(7)).with({'x': data.toObject(3)}),
        data.INT
      ),
      10
    )
  })
})
