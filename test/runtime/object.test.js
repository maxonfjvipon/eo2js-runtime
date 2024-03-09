const {RHO, SIGMA, VTX, LAMBDA, PHI, DELTA} = require('../../temp/runtime/attribute/specials.js')
const assert = require('assert')
const object = require('../../temp/runtime/object')
const at_simple = require('../../temp/runtime/attribute/at-simple')
const at_void = require('../../temp/runtime/attribute/at-void')
const ErFailure = require('../../temp/runtime/error/ErFailure');
const ErError = require('../../temp/runtime/error/ErError');

describe('object', function() {
  it(`should have ${VTX} attribute`, function() {
    assert.ok(object({}, 'obj').attrs.hasOwnProperty(VTX))
  })
  it(`should have ${SIGMA} attribute`, function() {
    assert.ok(object({}, 'obj').attrs.hasOwnProperty(SIGMA))
  })
  it(`should have ${RHO} attribute`, function() {
    assert.ok(object({}, 'obj').attrs.hasOwnProperty(RHO))
  })
  it(`should have empty assets`, function() {
    assert.equal(Object.keys(object({}, 'obj').assets).length, 0)
  })
  it('should be able to be printed', function() {
    assert.doesNotThrow(() => object({}, 'obj').toString())
  })
  it('should not be equal to other object', function() {
    assert.notDeepStrictEqual(object({}), object({}))
  })
  describe('#take()', function() {
    it('should return the same object from the simple attribute', function() {
      const first = object({})
      const second = object({})
      second.attrs['attr'] = at_simple(first)
      assert.deepStrictEqual(second.take('attr'), first)
    })
    it(`should return object through ${PHI} attribute`, function() {
      const first = object({})
      const second = object({})
      const phi = object(second)
      phi.attrs['attr'] = at_simple(first)
      second.attrs[PHI] = at_simple(phi)
      assert.deepStrictEqual(second.take('attr'), first)
    })
    it(`should return object through ${LAMBDA} asset`, function() {
      const first = object({})
      const second = object({})
      const third = object({})
      third.attrs['attr'] = at_simple(first)
      second.assets[LAMBDA] = function(_) {
        return third
      }
      assert.deepStrictEqual(second.take('attr'), first)
    })
    it('should throw an error if no attribute with given name', function() {
      assert.throws(() => object({}).take('attr'))
    })
    it(`should throw an error if no attribute in ${PHI} wih given name`, function() {
      const obj = object({})
      const phi = object(obj)
      obj.attrs[PHI] = at_simple(phi)
      assert.throws(() => obj.take('attr'))
    })
    it(`should throw an error if no attribute in ${LAMBDA} wih given name`, function() {
      const obj = object({})
      obj.assets[LAMBDA] = function(_) {
        return object({})
      }
      assert.throws(() => obj.take('attr'))
    })
    it('should return 1st put object by index', function() {
      const first = object({})
      const second = object({})
      second.attrs['attr'] = at_simple(first)
      assert.deepStrictEqual(second.take(0), first)
    })
    it('should return 1st put object by index with 2 injected', function() {
      const first = object({})
      const second = object({})
      second.attrs['first'] = at_simple(first)
      second.attrs['second'] = at_simple(object({}))
      assert.deepStrictEqual(second.take(0), first)
    })
    it('should return 2nd put object by index with 2 injected', function() {
      const first = object({})
      const second = object({})
      second.attrs['first'] = at_simple(object({}))
      second.attrs['second'] = at_simple(first)
      assert.deepStrictEqual(second.take(1), first)
    })
    it('should throw an error if position is float', function() {
      assert.throws(() => object({}).take(1.5))
    })
    it('should throw an error if position is negative', function() {
      assert.throws(() => object({}).take(-1))
    })
    it('should throw an error if no attribute with given position', function() {
      const obj = object({})
      assert.throws(() => obj.take(0))
      obj.attrs['attr'] = at_simple(object({}))
      assert.throws(() => obj.take(1))
    })
    it(`should throw an error if ${LAMBDA} attribute is being taken`, function() {
      const obj = object({})
      obj.attrs[LAMBDA] = at_simple({})
      assert.throws(() => obj.take(LAMBDA), ErFailure)
    })
    it(`should throw an error if absent ${LAMBDA} asset is being taken`, function() {
      assert.throws(() => object({}).take(LAMBDA), ErFailure)
    })
    it(`should validate the result of ${LAMBDA} asset`, function() {
      const obj = object({})
      obj.assets[LAMBDA] = function(_) {
        throw new ErFailure('error')
      }
      assert.throws(() => obj.take(LAMBDA), ErError)
    })
    it(`should wrap with "safe" the result of ${LAMBDA} asset`, function() {
      const obj = object({})
      obj.assets[LAMBDA] = function(_) {
        return {
          take: (_) => {
            throw new ErFailure('take')
          },
          with: (_) => {
            throw new ErFailure('with')
          }
        }
      }
      const res = obj.take(LAMBDA)
      assert.throws(() => res.take(''), ErError)
      assert.throws(() => res.with({}), ErError)
    })
    it('should wrap attribute with "at_safe"', function() {
      const obj = object({})
      obj.attrs['x'] = at_void('x')
      assert.throws(() => obj.take('x'), ErError)
    })
  })
  describe('#with()', function() {
    it('should put the right object by name', function() {
      const first = object({})
      const second = object({})
      first.attrs['attr'] = at_void('attr')
      first.with({attr: second})
      assert.deepStrictEqual(first.take('attr'), second)
    })
    it('should put object by position', function() {
      const first = object({})
      const second = object({})
      first.attrs['attr'] = at_void('attr')
      first.with({0: second})
      assert.deepStrictEqual(first.take('attr'), second)
    })
    it('should put object by 2nd position', function() {
      const first = object({})
      const second = object({})
      first.attrs['f'] = at_void('f')
      first.attrs['s'] = at_void('s')
      first.with({1: second})
      assert.throws(() => first.take('f'))
      assert.deepStrictEqual(first.take('s'), second)
    })
    it('should return self', function() {
      const obj = object({})
      obj.attrs['f'] = at_void('f')
      assert.deepStrictEqual(obj.with({f: object({})}), obj)
    })
    it('should throw an error if position is negative', function() {
      const obj = object({})
      obj.attrs['attr'] = at_void('attr')
      assert.throws(() => obj.with({'-1': object({})}))
    })
    it('should throw an error if position if float', function() {
      const obj = object({})
      obj.attrs['attr'] = at_void('attr')
      assert.throws(() => obj.with({'1.5': object({})}))
    })
    it('should throw an error if attribute with name is absent', function() {
      assert.throws(() => object({}).with({'at': object({})}))
    })
    it('should throw an error if attribute with position is absent', function() {
      assert.throws(() => object({}).with({0: object({})}))
    })
  })
  describe('#copy()', function() {
    it('should make a true copy', function() {
      const obj = object({})
      assert.notDeepStrictEqual(obj.copy(), obj)
    })
    it('should make a true copy of the attribute', function() {
      const obj = object({})
      const attr = object({})
      obj.attrs['attr'] = at_simple(attr)
      assert.notDeepStrictEqual(obj.copy().take('attr'), attr)
    })
    it(`should save the ${RHO} attribute`, function() {
      const rho = object({})
      assert.deepStrictEqual(object(rho).copy().take(RHO), rho)
    })
    it(`should save the ${SIGMA} attribute`, function() {
      const sigma = object({})
      assert.deepStrictEqual(object(sigma).copy().take(SIGMA), sigma)
    })
    it('should copy assets', function() {
      const obj = object({})
      obj.assets[LAMBDA] = function(_) {
        return object({})
      }
      obj.assets[DELTA] = [0x01, 0x00]
      const copy = obj.copy()
      assert.deepStrictEqual(obj.assets, copy.assets)
    })
  })
})
