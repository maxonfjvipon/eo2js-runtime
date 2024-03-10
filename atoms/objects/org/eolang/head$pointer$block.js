const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * Head.pointer.block.
 * @param {Object} sigma - Sigma
 * @return {Object} - Head.pointer.block object
 */
const head$pointer$block = function(sigma) {
  const obj = object(sigma, 'head$pointer$block')
  obj.assets[LAMBDA] = function(self) {
    throw new ErFailure(
      `Atom head$pointer$block implemented yet`
    )
  }
  return obj
}

module.exports = head$pointer$block
