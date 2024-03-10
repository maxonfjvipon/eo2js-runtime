const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * Bytes.not.
 * @param {Object} sigma - Sigma
 * @return {Object} - Bytes.not object
 */
const bytes$not = function(sigma) {
  const obj = object(sigma, 'bytes$not')
  obj.assets[LAMBDA] = function(self) {
    throw new ErFailure(
      `Atom bytes$not is not implemented yet`
    )
  }
  return obj
}

module.exports = bytes$not
