/**
 * Attribute that keeps \rho attribute.
 * @param {Object} rho - Rho
 * @return {Object} - Rho attribute
 */
const at_rho = function(rho) {
  return {
    put: function(obj) {
      rho = obj
    },
    get: function() {
      return rho
    },
    copy: function(_) {
      return at_rho(rho)
    }
  }
}

module.exports = at_rho
