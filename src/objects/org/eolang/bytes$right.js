const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * Bytes.right.
 * @param {Object} sigma - Sigma
 * @return {Object} - Bytes.right object
 */
const bytes$right = function(sigma) {
  const obj = object(sigma, 'bytes$right')
  obj.assets[LAMBDA] = function(self) {
    throw new ErFailure(
      `Atom bytes$right is not implemented yet`
    )
  }
  return obj
}

module.exports = bytes$right
