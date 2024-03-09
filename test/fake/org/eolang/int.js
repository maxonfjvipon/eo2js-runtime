/**
 * Fake int EO object that is used for the test purposes.
 * Don't change the file until you definitely know what you're doing.
 * For more information please read README.md in test/fake folder
 * @param {Object} sigma - Sigma
 * @return {Object} - Object
 */
const int = function(sigma) {
  const object = require('../../../runtime/object')
  const attr = require('../../../runtime/attribute/attr')
  const {PHI} = require('../../../runtime/attribute/specials')
  const obj = object(sigma, 'int')
  obj.attrs['as-bytes'] = attr.void('as-bytes')
  obj.attrs[PHI] = attr.once(attr.lambda(obj, (rho) => rho.take('as-bytes')))
  return obj
}

module.exports = int
