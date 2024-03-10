const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * Seq.
 * @param {Object} sigma - Sigma
 * @return {Object} - Seq object
 */
const seq = function(sigma) {
  const obj = object(sigma, 'seq')
  obj.assets[LAMBDA] = function(self) {
    throw new ErFailure(
      `Atom seq implemented yet`
    )
  }
  return obj
}

module.exports = seq
