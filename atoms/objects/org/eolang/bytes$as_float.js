const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * Bytes.as_float.
 * @param {Object} sigma - Sigma
 * @return {Object} - Bytes.as_float object
 */
const bytes$as_float = function(sigma) {
  const obj = object(sigma, 'bytes$as_float')
  obj.assets[LAMBDA] = function(self) {
    throw new ErFailure(
      `Atom bytes$as_float implemented yet`
    )
  }
  return obj
}

module.exports = bytes$as_float
