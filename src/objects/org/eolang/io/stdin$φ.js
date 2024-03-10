const object = require('../../../../runtime/object')
const {LAMBDA} = require('../../../../runtime/attribute/specials');
const ErFailure = require('../../../../runtime/error/ErFailure');

/**
 * Stdin.φ.
 * @param {Object} sigma - Sigma
 * @return {Object} - Stdin.φ object
 */
const stdin$φ = function(sigma) {
  const obj = object(sigma, 'stdin$φ')
  obj.assets[LAMBDA] = function(self) {
    throw new ErFailure(
      `Atom stdin$φ is not implemented yet`
    )
  }
  return obj
}

module.exports = stdin$φ
