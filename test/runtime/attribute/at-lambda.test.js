const assert = require('assert');
const at_lambda = require('../../../temp/runtime/attribute/at-lambda');
const at_void = require('../../../temp/runtime/attribute/at-void');
const object = require('../../../temp/runtime/object');
const ErFailure = require('../../../temp/runtime/error/ErFailure');
const ErError = require('../../../temp/runtime/error/ErError');

describe('at_lambda', function() {
  describe('#put()', function() {
    it('should fail', function() {
      assert.throws(() => at_lambda({}, () => {}).put({}))
    })
  })
  describe('#get()', function() {
    it('should execute callback', function() {
      const obj = object({}, '')
      assert.deepStrictEqual(
        at_lambda({}, (_) => obj).get(),
        obj
      )
    })
    it('should pass given object to callback', function() {
      const obj = object({}, '')
      obj.attrs.attr = at_void('attr')
      const put = object({}, 'put')
      at_lambda(obj, function(rho) {
        return rho.with({attr: put})
      }).get()
      assert.deepStrictEqual(obj.take('attr'), put)
    })
    it('should validate given callback', function() {
      assert.throws(
        at_lambda({}, (_) => {
          throw new ErFailure('error')
        }).get,
        ErError
      )
    })
  })
})
