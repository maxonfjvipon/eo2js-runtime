const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * Bool.while.
 * @param {Object} sigma - Sigma
 * @return {Object} - Bool.while object
 */
const bool$while = function(sigma) {
  const obj = object(sigma, 'bool$while')
  obj.assets[LAMBDA] = function(self) {
    throw new ErFailure(
      `Atom bool$while implemented yet`
    )
  }
  return obj
}

module.exports = bool$while
