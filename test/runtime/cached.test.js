const assert = require('assert')
const object = require('../../src/runtime/object')
const cached = require('../../src/runtime/cached');
const at_lambda = require('../../src/runtime/attribute/at-lambda');
const at_void = require('../../src/runtime/attribute/at-void');
const {RHO} = require('../../src/runtime/attribute/specials');

describe('cached object', function() {
  describe('#copy()', function() {
    it('should return other object', function() {
      const obj = object({}, '')
      assert.notDeepStrictEqual(cached(obj).copy(), obj)
    })
  })
  describe('#take()', function() {
    it('should cache attribute', function() {
      let count = 0
      const obj = object({}, '')
      obj.attrs['attr'] = at_lambda(obj, (_) => {
        count++
        return object({}, `any ${count}`)
      })
      const chd = cached(obj)
      const first = chd.take('attr')
      const second = chd.take('attr')
      assert.deepStrictEqual(first, second)
      assert.equal(count, 1)
    })
    it(`should cache through ${RHO}`, function() {
      let count = 0
      const obj = object({}, '')
      obj.attrs['attr'] = at_lambda(obj, (rho) => {
        count++
        return object(rho, `any ${count}`)
      })
      const chd = cached(obj)
      const attr = chd.take('attr')
      const rho = attr.take(RHO)
      assert.deepStrictEqual(chd, rho)
      assert.deepStrictEqual(rho.take('attr'), attr)
      assert.equal(count, 1)
    })
  })
  describe('#with()', function() {
    it('should call #with() on origin object', function() {
      const obj = object({}, '')
      obj.attrs['attr'] = at_void('attr')
      const attr = object({}, 'attr')
      const chd = cached(obj).with({attr})
      assert.deepStrictEqual(chd.take('attr'), attr)
    })
  })
})
