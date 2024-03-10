const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * Ram.slice.
 * @param {Object} sigma - Sigma
 * @return {Object} - Ram.slice object
 */
const ram$slice = function(sigma) {
  const obj = object(sigma, 'ram$slice')
  obj.assets[LAMBDA] = function(self) {
    throw new ErFailure(
      `Atom ram$slice is not implemented yet`
    )
  }
  return obj
}

module.exports = ram$slice
