const at_fixed = require('../../../src/runtime/attribute/at-fixed')
const at_simple = require('../../../src/runtime/attribute/at-simple')
const object = require('../../../src/runtime/object')
const assert = require('assert');

describe('at_fixed', function() {
  describe('#put()', function() {
    it('should do nothing', function() {
      const obj = object({}, '')
      const attr = at_fixed(at_simple(obj))
      attr.put({any: {}})
      assert.deepStrictEqual(attr.get(), obj)
    })
  })
  describe('#get()', function() {
    it('should return from origin', function() {
      const obj = object({}, '')
      const origin = {get: () => obj}
      assert.deepStrictEqual(at_fixed(origin).get(), obj)
    });
  })
  describe('#copy()', function() {
    it('should return new attribute', function() {
      const origin = {copy: (_) => origin}
      const attr = at_fixed(origin)
      assert.notDeepStrictEqual(attr.copy(), attr)
    })
    it('should call #copy() on origin', function() {
      const some = {get: () => 'Hello'}
      const origin = {copy: (rho) => rho}
      assert.equal(at_fixed(origin).copy(some).get(), 'Hello')
    })
  })
})
