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
      if (obj != null) {
        throw new ErFailure(`Void attribute ${name} is already set, can't reset`)
      }
      obj = object
    },
    get: function() {
      if (obj == null) {
        throw new ErFailure(`Void attribute ${name} is not set, can't take`)
      }
      return obj
    },
    copy: function(rho) {
      let copy
      if (obj != null) {
        copy = at_simple(obj).copy(rho)
      } else {
        copy = at_void(name)
      }
      return copy
    }
  }
}

module.exports = at_void
