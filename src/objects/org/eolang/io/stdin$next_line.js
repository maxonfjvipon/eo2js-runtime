const object = require('../../../../runtime/object')
const {LAMBDA} = require('../../../../runtime/attribute/specials');
const ErFailure = require('../../../../runtime/error/ErFailure');

/**
 * Stdin.next_line.
 * @param {Object} sigma - Sigma
 * @return {Object} - Stdin.next_line object
 */
const stdin$next_line = function(sigma) {
  const obj = object(sigma, 'stdin$next_line')
  obj.assets[LAMBDA] = function(self) {
    throw new ErFailure(
      `Atom stdin$next_line is not implemented yet`
    )
  }
  return obj
}

module.exports = stdin$next_line
