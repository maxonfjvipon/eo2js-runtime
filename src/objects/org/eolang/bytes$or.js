const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * Bytes.or.
 * @param {Object} sigma - Sigma
 * @return {Object} - Bytes.or object
 */
const bytes$or = function(sigma) {
  const obj = object(sigma, 'bytes$or')
  obj.assets[LAMBDA] = function(self) {
    throw new ErFailure(
      `Atom bytes$or is not implemented yet`
    )
  }
  return obj
}

module.exports = bytes$or
