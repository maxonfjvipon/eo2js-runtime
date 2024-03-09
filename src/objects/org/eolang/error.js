const object = require('../../../runtime/object')
const at_void = require('../../../runtime/attribute/at-void')
const {LAMBDA, RHO} = require('../../../runtime/attribute/specials');
const ErError = require('../../../runtime/error/ErError');

/**
 * Error.
 * You are NOT supposed to use this object programmatically. It is only
 * used from EO, but not from JS. From JS, you just throw
 * {@link ErFailure}. It will be properly caught and converted to the error.
 * Again, DON'T USE THIS OBJECT PROGRAMMATICALLY.
 * @param {Object} sigma - Sigma
 * @return {Object} - Error object
 */
const error = function(sigma) {
  const obj = object(sigma, 'error')
  obj.attrs['α'] = at_void('α')
  obj.assets[LAMBDA] = function(self) {
    throw new ErError(
      self.take('α').with({[RHO]: self})
    )
  }
  return obj
}

module.exports = error
