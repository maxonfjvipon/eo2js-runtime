const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * Ram.write.
 * @param {Object} sigma - Sigma
 * @return {Object} - Ram.write object
 */
const ram$write = function(sigma) {
  const obj = object(sigma, 'ram$write')
  obj.assets[LAMBDA] = function(self) {
    throw new ErFailure(
      `Atom ram$write implemented yet`
    )
  }
  return obj
}

module.exports = ram$write
