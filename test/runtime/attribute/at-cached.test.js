const object = require('../../../src/runtime/object')
const assert = require('assert');
const at_cached = require('../../../src/runtime/attribute/at-cached');

describe('at_cached', function() {
  describe('#put()', function() {
    it('should call #put() on origin attribute', function() {
      let count = 0
      const attr = at_cached({put: (_) => count++})
      attr.put({any: {}})
      assert.equal(count, 1)
    })
  })
  describe('#get()', function() {
    it('should return from origin and cache', function() {
      let count = 0
      const obj = object({}, '')
      const origin = {
        get: () => {
          count++
          return obj
        }
      }
      const cached = at_cached(origin)
      cached.get()
      assert.deepStrictEqual(cached.get(), obj)
      assert.equal(count, 1)
    });
  })
  describe('#copy()', function() {
    it('should return new attribute', function() {
      const origin = {copy: (_) => origin}
      const attr = at_cached(origin)
      assert.notDeepStrictEqual(attr.copy(), attr)
    })
    it('should call #copy() on origin', function() {
      const some = {get: () => 'Hello'}
      const origin = {copy: (rho) => rho}
      assert.equal(at_cached(origin).copy(some).get(), 'Hello')
    })
    it('should reset cache', function() {
      let count = 0
      const origin = {
        copy: (_) => origin,
        get: () => count++
      }
      const cached = at_cached(origin)
      cached.get()
      cached.get()
      cached.copy().get()
      assert.equal(count, 2)
    })
  })
})
