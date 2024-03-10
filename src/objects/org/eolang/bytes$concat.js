const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * Bytes.concat.
 * @param {Object} sigma - Sigma
 * @return {Object} - Bytes.concat object
 */
const bytes$concat = function(sigma) {
  const obj = object(sigma, 'bytes$concat')
  obj.assets[LAMBDA] = function(self) {
    throw new ErFailure(
      `Atom bytes$concat is not implemented yet`
    )
  }
  return obj
}

module.exports = bytes$concat
