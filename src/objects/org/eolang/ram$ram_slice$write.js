const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * Ram.ram_slice.write.
 * @param {Object} sigma - Sigma
 * @return {Object} - Ram.ram_slice.write object
 */
const ram$ram_slice$write = function(sigma) {
  const obj = object(sigma, 'ram$ram_slice$write')
  obj.assets[LAMBDA] = function(self) {
    throw new ErFailure(
      `Atom ram$ram_slice$write is not implemented yet`
    )
  }
  return obj
}

module.exports = ram$ram_slice$write
