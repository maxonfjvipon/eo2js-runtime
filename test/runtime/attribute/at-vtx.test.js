const at_vtx = require('../../../temp/runtime/attribute/at-vtx')
const assert = require('assert')
const ErFailure = require('../../../temp/runtime/error/ErFailure');

describe('at_vtx', function() {
  describe('#put()', function() {
    it('should throw an error', function() {
      assert.throws(
        () => at_vtx(1, {}).put(2),
        ErFailure
      )
    })
  })
  describe('#copy()', function() {
    it('should throw an error', function() {
      assert.throws(
        () => at_vtx(1, {}).copy(),
        ErFailure
      )
    })
  })
})
