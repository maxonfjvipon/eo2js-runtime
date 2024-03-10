const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * Ram.ram_slice.φ.
 * @param {Object} sigma - Sigma
 * @return {Object} - Ram.ram_slice.φ object
 */
const ram$ram_slice$φ = function(sigma) {
  const obj = object(sigma, 'ram$ram_slice$φ')
  obj.assets[LAMBDA] = function(self) {
    throw new ErFailure(
      `Atom ram$ram_slice$φ implemented yet`
    )
  }
  return obj
}

module.exports = ram$ram_slice$φ
