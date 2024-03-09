const at_simple = require('./at-simple')
const ErFailure = require('../error/ErFailure');

/**
 * Void attribute.
 * @param {string} name - Name of the attribute
 * @return {any} - Free attribute
 */
const at_void = function(name) {
  let obj = null
  return {
    put: function(object) {
      if (!obj) {
        obj = object
      } else {
        throw new ErFailure(`Void attribute ${name} is already set, can't reset`)
      }
    },
    get: function() {
      if (obj) {
        return obj
      } else {
        throw new ErFailure(`Void attribute ${name} is not set, can't take`)
      }
    },
    copy: function(_) {
      if (obj) {
        return at_simple(obj) // obj.copy() ?
      } else {
        return at_void(name)
      }
    }
  }
}

module.exports = at_void
