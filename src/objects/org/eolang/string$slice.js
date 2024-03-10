const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * String.slice.
 * @param {Object} sigma - Sigma
 * @return {Object} - String.slice object
 */
const string$slice = function(sigma) {
  const obj = object(sigma, 'string$slice')
  obj.assets[LAMBDA] = function(self) {
    throw new ErFailure(
      `Atom string$slice is not implemented yet`
    )
  }
  return obj
}

module.exports = string$slice
