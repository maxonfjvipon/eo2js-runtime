const bool$if = require('../../../../temp/objects/org/eolang/bool$if');
const data = require('../../../../temp/runtime/data');
const {INT} = require('../../../../temp/runtime/data');
const assert = require('assert');
const dataized = require('../../../../temp/runtime/dataized');

describe('bool$if', function() {
  it('should be dataized as first if TRUE', function() {
    assert.equal(
      dataized(
        bool$if(data.toObject(true)).with({
          0: data.toObject(1),
          1: data.toObject(2)
        }),
        INT
      ),
      1
    )
  })
  it('should be dataized as second if FALSE', function() {
    assert.equal(
      dataized(
        bool$if(data.toObject(false)).with({
          0: data.toObject(1),
          1: data.toObject(2)
        }),
        INT
      ),
      2
    )
  })
})
