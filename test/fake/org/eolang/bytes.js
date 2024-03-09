/**
 * Fake bytes EO object that is used for the test purposes.
 * Don't change the file until you definitely know what you're doing.
 * For more information please read README.md in test/fake folder
 * @param {Object} sigma - Sigma
 * @return {Object} - Object
 */
const bytes = function(sigma) {
  const object = require('../../../runtime/object')
  return object(sigma, 'bytes')
}

module.exports = bytes
