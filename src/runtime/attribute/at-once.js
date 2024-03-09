const at_cached = require('./at-cached');
const ErFailure = require('../error/ErFailure');

/**
 * Attribute that is read only once.
 * @param {object} origin - Original attribute
 * @return {any} - Attribute
 */
const at_once = function(origin) {
  const once = at_cached(origin)
  once.put = function(_) {
    throw new ErFailure(`You can't overwrite ${origin}`)
  }
  once.copy = function(object) {
    return at_once(origin.copy(object))
  }
  return once
}

module.exports = at_once
