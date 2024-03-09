const ErFailure = require('../error/ErFailure');
const validated = require('../validated');

/**
 * Lazy lambda attribute.
 * @param {object} object - Rho
 * @param {function(self: object): object} callback - Lambda to call
 * @return {any} Lazy lambda attribute
 */
const at_lambda = function(object, callback) {
  return {
    put: function(_) {
      throw new ErFailure(`You can't override lambda expression`)
    },
    get: function() {
      return validated(() => callback(object))
    },
    copy: function(rho) {
      return at_lambda(rho, callback)
    }
  }
}

module.exports = at_lambda
