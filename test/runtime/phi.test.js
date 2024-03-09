const assert = require('assert')
const phi = require('../../temp/runtime/phi')
const object = require('../../temp/runtime/object')
const {VTX, PHI, SIGMA, RHO} = require('../../temp/runtime/attribute/specials')

describe('Φ', function() {
  it('should have vtx attribute', function() {
    assert.ok(phi.attrs.hasOwnProperty(VTX))
  })
  describe('#take()', function() {
    it('should return the same default package object', function() {
      assert.deepStrictEqual(phi.take(''), phi.take(''))
    })
    it('should throw an error if special attributes are taken', function() {
      assert.throws(() => phi.take(PHI))
      assert.throws(() => phi.take(SIGMA))
      assert.throws(() => phi.take(RHO))
    })
    it('should return the same existed package object', function() {
      assert.deepStrictEqual(phi.take('org'), phi.take('org'))
    });
  })
  describe('#copy()', function() {
    it('should not copy', function() {
      assert.deepStrictEqual(phi.copy(), phi)
    })
  })
  describe('#with()', function() {
    it('should not set any attribute', function() {
      const before = Object.keys(phi.attrs).length
      phi.with({attr: object({})})
      const after = Object.keys(phi.attrs).length
      assert.equal(before, after)
    })
  })
})
