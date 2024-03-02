const dataized = require('../../../runtime/dataized')
const object = require('../../../runtime/object')
const data = require('../../../runtime/data')
const {LAMBDA, RHO} = require('../../../runtime/attribute/specials')
const at_void = require('../../../runtime/attribute/at-void')

/**
 * int.plus.
 * @param {object} sigma - Sigma
 * @return {any} - Int.plus object
 */
const int$plus = function(sigma) {
  const obj = object(sigma, 'int$plus')
  obj.attrs['x'] = at_void('x')
  obj.assets[LAMBDA] = function(self) {
    return data.toObject(
      dataized(self.take(RHO)) + dataized(self.take('x'))
    )
  }
  return obj
}

module.exports = int$plus
