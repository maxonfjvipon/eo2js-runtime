const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * Cage.
 * @param {Object} sigma - Sigma
 * @return {Object} - Cage object
 */
const cage = function(sigma) {
  const obj = object(sigma, 'cage')
  obj.assets[LAMBDA] = function(self) {
    throw new ErFailure(
      `Atom cage is not implemented yet`
    )
  }
  return obj
}

module.exports = cage
