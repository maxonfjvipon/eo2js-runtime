const {RHO} = require('./specials');
/**
 * Simple attribute.
 * @param {object} object - Object ot return
 * @return {any} - Simple attribute
 */
const at_simple = function(object) {
  return {
    put: function(obj) {
      object = obj
    },
    get: function() {
      return object
    },
    copy: function(rho) {
      return at_simple(object.copy().with({[RHO]: rho}))
    }
  }
}

module.exports = at_simple
