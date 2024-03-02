const at_vtx = require('../../../src/runtime/attribute/at-vtx')
const assert = require('assert')

describe('at_vtx', function() {
  describe('#put()', function() {
    it('should throw an error', function() {
      assert.throws(() => at_vtx(1).put(2))
    })
  })
  describe('#copy()', function() {
    it('should return new attribute', function() {
      const attr = at_vtx(1)
      assert.notDeepStrictEqual(attr.copy(), attr)
    })
  })
})
