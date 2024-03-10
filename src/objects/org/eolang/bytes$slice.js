const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * Bytes.slice.
 * @param {Object} sigma - Sigma
 * @return {Object} - Bytes.slice object
 */
const bytes$slice = function(sigma) {
  const obj = object(sigma, 'bytes$slice')
  obj.assets[LAMBDA] = function(self) {
    throw new ErFailure(
      `Atom bytes$slice is not implemented yet`
    )
  }
  return obj
}

module.exports = bytes$slice
