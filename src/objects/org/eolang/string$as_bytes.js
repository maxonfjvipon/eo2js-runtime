const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * String.as_bytes.
 * @param {Object} sigma - Sigma
 * @return {Object} - String.as_bytes object
 */
const string$as_bytes = function(sigma) {
  const obj = object(sigma, 'string$as_bytes')
  obj.assets[LAMBDA] = function(self) {
    throw new ErFailure(
      `Atom string$as_bytes is not implemented yet`
    )
  }
  return obj
}

module.exports = string$as_bytes
