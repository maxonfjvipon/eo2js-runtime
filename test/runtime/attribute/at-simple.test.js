const at_simple = require('../../../temp/runtime/attribute/at-simple')
const assert = require('assert')

describe('at_simple', function() {
  describe('#put()', function() {
    it('should successfully put object', function() {
      const attr = at_simple(5)
      attr.put(10)
      assert.equal(attr.get(), 10)
    })
  })
  describe('#get()', function() {
    it('should just return an object', function() {
      assert.equal(at_simple(42).get(), 42)
    })
  })
  describe('#copy()', function() {
    it('should return new attribute', function() {
      const origin = {copy: () => origin}
      const attr = at_simple(origin)
      assert.notDeepStrictEqual(attr.copy(), attr)
    })
    it('should call #copy() on origin', function() {
      const origin = {copy: () => 'Hello'}
      assert.equal(at_simple(origin).copy().get(), 'Hello')
    });
  })
})
