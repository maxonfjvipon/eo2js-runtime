const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * Bytes.as_int.
 * @param {Object} sigma - Sigma
 * @return {Object} - Bytes.as_int object
 */
const bytes$as_int = function(sigma) {
  const obj = object(sigma, 'bytes$as_int')
  obj.assets[LAMBDA] = function(self) {
    throw new ErFailure(
      `Atom bytes$as_int is not implemented yet`
    )
  }
  return obj
}

module.exports = bytes$as_int
