const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * Bytes.size.
 * @param {Object} sigma - Sigma
 * @return {Object} - Bytes.size object
 */
const bytes$size = function(sigma) {
  const obj = object(sigma, 'bytes$size')
  obj.assets[LAMBDA] = function(self) {
    throw new ErFailure(
      `Atom bytes$size implemented yet`
    )
  }
  return obj
}

module.exports = bytes$size
