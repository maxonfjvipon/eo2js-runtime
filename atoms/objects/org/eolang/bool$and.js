const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * Bool.and.
 * @param {Object} sigma - Sigma
 * @return {Object} - Bool.and object
 */
const bool$and = function(sigma) {
  const obj = object(sigma, 'bool$and')
  obj.assets[LAMBDA] = function(self) {
    throw new ErFailure(
      `Atom bool$and implemented yet`
    )
  }
  return obj
}

module.exports = bool$and
