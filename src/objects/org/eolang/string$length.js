const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * String.length.
 * @param {Object} sigma - Sigma
 * @return {Object} - String.length object
 */
const string$length = function(sigma) {
  const obj = object(sigma, 'string$length')
  obj.assets[LAMBDA] = function(self) {
    throw new ErFailure(
      `Atom string$length is not implemented yet`
    )
  }
  return obj
}

module.exports = string$length
