const memory = require('../../../../temp/objects/org/eolang/memory');
const int$plus = require('../../../../temp/objects/org/eolang/int$plus');
const assert = require('assert');
const data = require('../../../../temp/runtime/data');
const {STRING, INT} = require('../../../../temp/runtime/data');
const dataized = require('../../../../temp/runtime/dataized');

describe('memory', function() {
  it('should read and write', function() {
    const mem = memory({})
    dataized(
      mem.take('write').copy().with({
        0: data.toObject('Hello, world!')
      })
    )
    assert.equal(dataized(mem, STRING), 'Hello, world!')
  })
  it('should write and rewrite', function() {
    const mem = memory({})
    dataized(mem.take('write').copy().with({0: data.toObject(1)}))
    assert.equal(dataized(mem, INT), 1)
    dataized(mem.take('write').copy().with({0: data.toObject(2)}))
    assert.equal(dataized(mem, INT), 2)
  })
  it('should make a true copy', function() {
    const first = memory({}).with({0: data.toObject(1)})
    const second = first.copy()
    dataized(
      second.take('write').copy().with({
        0: data.toObject(10)
      })
    )
    assert.equal(dataized(first, INT), 1)
    assert.equal(dataized(second, INT), 10)
  })
  it('should rewrite itself', function() {
    const mem = memory({}).with({0: data.toObject(1)})
    dataized(mem.take('write').copy().with({0: data.toObject(2)}))
    assert.equal(dataized(mem, INT), 2)
    dataized(mem.take('write').copy().with({
      0: int$plus(mem).with({0: data.toObject(10)})
    }))
    assert.equal(dataized(mem, INT), 12)
  })
  it('should not write more than allocated', function() {
    const mem = memory({}).with({0: data.toObject(true)})
    assert.throws(() => dataized(mem.take('write').with({0: data.toObject(8)})))
  })
  it('should rewrite the if size is the same or less', function() {
    const mem = memory({}).with({0: data.toObject('Hello')})
    assert.doesNotThrow(() => dataized(mem.take('write').copy().with({0: data.toObject('ABCDE')})))
    assert.doesNotThrow(() => dataized(mem.take('write').copy().with({0: data.toObject('XYZ')})))
    assert.throws(() => dataized(mem.take('write').copy().with({0: data.toObject('EOLANG')})))
  })
  describe('write', function() {
    it('should be dataized to written result', function() {
      const mem = memory({})
      const write = mem.take('write')
      assert.deepStrictEqual(
        dataized(write.copy().with({0: data.toObject('Hello')})),
        dataized(mem)
      )
    })
  })
})
