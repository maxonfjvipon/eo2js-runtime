const phi = require('../../src/runtime/phi')
const {RHO, SIGMA, VTX} = require('../../src/runtime/attribute/specials')
const assert = require('assert')
const pckg = require('../../src/runtime/package')

describe('Empty package object', function() {
  it('should be child of phi', function() {
    assert.deepStrictEqual(phi.take('').take(RHO), phi)
  })
  it('should have special attributes', function() {
    const obj = pckg('', {})
    assert.ok(obj.attrs.hasOwnProperty(RHO))
    assert.ok(obj.attrs.hasOwnProperty(SIGMA))
    assert.ok(obj.attrs.hasOwnProperty(VTX))
  })
  describe('#take()', function() {
    it('should return next level package object', function() {
      const obj = pckg('', {})
      assert.notDeepStrictEqual(obj.take('org'), obj)
    })
    it('should return child of empty package object', function() {
      const obj = pckg('', {})
      assert.deepStrictEqual(obj.take('org').take(RHO), obj)
    })
    it('should cache next level object', function() {
      const obj = pckg('', {})
      assert.deepStrictEqual(obj.take('org'), obj.take('org'))
    })
    it('should fail on wrong path', function() {
      assert.throws(() => pckg('', {}).take('wrong'))
    })
    it('should return the same next level object with and without dots', function() {
      const obj = pckg('', {})
      assert.deepStrictEqual(
        obj.take('org').take('eolang'),
        obj.take('org.eolang')
      )
    })
    it('should return valid EO object', function() {
      assert.doesNotThrow(() => pckg('', {}).take('org.eolang.io.stdout').toString())
    })
  })
  describe('#with()', function() {
    it('should fail on put', function() {
      assert.throws(() => pckg('', {}).with({0: 'any'}))
    })
  })
  describe('#copy()', function() {
    it('should return itself', function() {
      const obj = pckg('', {})
      assert.deepStrictEqual(obj.copy(), obj)
    });
  })
})
describe('"org" package object', function() {
  it('should have special attributes', function() {
    const obj = pckg('', {}).take('org')
    assert.ok(obj.attrs.hasOwnProperty(RHO))
    assert.ok(obj.attrs.hasOwnProperty(SIGMA))
    assert.ok(obj.attrs.hasOwnProperty(VTX))
  })
  describe('#with()', function() {
    it('should fail on put', function() {
      assert.throws(() => pckg('', {}).take('org').with({0: 'any'}))
    })
  })
  describe('#copy()', function() {
    it('should return itself', function() {
      const org = pckg('', {}).take('org')
      assert.deepStrictEqual(org.copy(), org)
    })
  })
  describe('#take()', function() {
    it('should return child "eolang" package object', function() {
      const org = pckg('', {}).take('org')
      assert.deepStrictEqual(org.take('eolang').take(RHO), org)
    })
    it('should fail on wrong path', function() {
      const org = pckg('', {}).take('org')
      assert.throws(() => org.take('wrong'))
    })
  })
})
