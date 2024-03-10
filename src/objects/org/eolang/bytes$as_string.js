const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * Bytes.as_string.
 * @param {Object} sigma - Sigma
 * @return {Object} - Bytes.as_string object
 */
const bytes$as_string = function(sigma) {
  const obj = object(sigma, 'bytes$as_string')
  obj.assets[LAMBDA] = function(self) {
    throw new ErFailure(
      `Atom bytes$as_string is not implemented yet`
    )
  }
  return obj
}

module.exports = bytes$as_string
