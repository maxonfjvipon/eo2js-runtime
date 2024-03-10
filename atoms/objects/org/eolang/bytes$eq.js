const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * Bytes.eq.
 * @param {Object} sigma - Sigma
 * @return {Object} - Bytes.eq object
 */
const bytes$eq = function(sigma) {
  const obj = object(sigma, 'bytes$eq')
  obj.assets[LAMBDA] = function(self) {
    throw new ErFailure(
      `Atom bytes$eq implemented yet`
    )
  }
  return obj
}

module.exports = bytes$eq
