const ErFailure = require('../error/ErFailure');
const {SIGMA} = require('./specials');

/**
 * Attribute that ignores putting.
 * @param {Object} sigma - Sigma
 * @return {Object} - Sigma attribute
 */
const at_sigma = function(sigma) {
  return {
    put: function(_) {
      // Ignore it
    },
    get: function() {
      return sigma
    },
    copy: function(_) {
      throw new ErFailure(`You can't explicitly copy ${SIGMA} attribute`)
    }
  }
}

module.exports = at_sigma
