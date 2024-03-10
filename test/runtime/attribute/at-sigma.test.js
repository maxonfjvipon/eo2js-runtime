const at_sigma = require('../../../temp/runtime/attribute/at-sigma')
const object = require('../../../temp/runtime/object')
const assert = require('assert');
const ErFailure = require('../../../temp/runtime/error/ErFailure');

describe('at_sigma', function() {
  describe('#put()', function() {
    it('should do nothing', function() {
      const obj = object({}, '')
      const attr = at_sigma(obj)
      attr.put({any: {}})
      assert.deepStrictEqual(attr.get(), obj)
    })
  })
  describe('#get()', function() {
    it('should return just object', function() {
      const obj = object({}, '')
      const origin = {get: () => obj}
      assert.deepStrictEqual(origin.get(), obj)
    });
  })
  describe('#copy()', function() {
    it('should fail', function() {
      assert.throws(() => at_sigma({}).copy(), ErFailure)
    })
  })
})
