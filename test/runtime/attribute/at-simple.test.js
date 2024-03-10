const at_simple = require('../../../temp/runtime/attribute/at-simple')
const object = require('../../../temp/runtime/object')
const assert = require('assert')
const {RHO} = require('../../../temp/runtime/attribute/specials');

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
      const origin = {
        copy: (_) => origin,
        with: (_) => origin
      }
      const attr = at_simple(origin)
      assert.notDeepStrictEqual(attr.copy(), attr)
    })
    it('should call #copy() on object', function() {
      let count = 0
      const obj = {
        copy: (_) => {
          count++;
          return obj
        },
        with: (_) => obj
      }
      at_simple(obj).copy()
      assert.equal(count, 1)
    })
    it(`should update ${RHO} on object`, function() {
      const obj = object({}, 'obj')
      const rho = object({}, 'rho')
      assert.deepStrictEqual(
        at_simple(obj).copy(rho).get().take(RHO),
        rho
      )
    })
  })
})
