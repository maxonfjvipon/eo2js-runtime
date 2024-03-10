const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * As_phi.
 * @param {Object} sigma - Sigma
 * @return {Object} - As_phi object
 */
const as_phi = function(sigma) {
  const obj = object(sigma, 'as_phi')
  obj.assets[LAMBDA] = function(self) {
    throw new ErFailure(
      `Atom as_phi is not implemented yet`
    )
  }
  return obj
}

module.exports = as_phi
