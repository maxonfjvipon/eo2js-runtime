const dataized = require('../../../runtime/dataized')
const object = require('../../../runtime/object')
const data = require('../../../runtime/data')
const {INT} = require('../../../runtime/data')
const {LAMBDA, RHO} = require('../../../runtime/attribute/specials')
const at_void = require('../../../runtime/attribute/at-void')

/**
 * Int.times.
 * @param {object} sigma - Sigma
 * @return {any} - Int.times object
 */
const int$times = function(sigma) {
  const obj = object(sigma, 'int$times')
  obj.attrs['x'] = at_void('x')
  obj.assets[LAMBDA] = function(self) {
    return data.toObject(
      dataized(self.take(RHO), INT) * dataized(self.take('x'), INT)
    )
  }
  return obj
}

module.exports = int$times
