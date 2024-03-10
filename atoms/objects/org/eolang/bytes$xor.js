const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * Bytes.xor.
 * @param {Object} sigma - Sigma
 * @return {Object} - Bytes.xor object
 */
const bytes$xor = function(sigma) {
  const obj = object(sigma, 'bytes$xor')
  obj.assets[LAMBDA] = function(self) {
    throw new ErFailure(
      `Atom bytes$xor implemented yet`
    )
  }
  return obj
}

module.exports = bytes$xor
