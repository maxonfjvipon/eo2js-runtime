/**
 * Attribute that ignores putting.
 * @param {object} origin - Original attribute
 * @return {any} - Attribute
 */
const at_fixed = function(origin) {
  return {
    put: function(_) {
      // ignore it
    },
    get: function() {
      return origin.get()
    },
    copy: function(rho) {
      return at_fixed(origin.copy(rho))
    }
  }
}

module.exports = at_fixed
