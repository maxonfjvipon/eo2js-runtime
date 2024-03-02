const dataized = require('../../../runtime/dataized')
const object = require('../../../runtime/object')
const data = require('../../../runtime/data')
const {LAMBDA, RHO} = require('../../../runtime/attribute/specials')
const at_void = require('../../../runtime/attribute/at-void')

/**
 * int.div.
 * @param {object} sigma - Sigma
 * @return {any} - Int.div object
 */
const int$div = function(sigma) {
  const obj = object(sigma, 'int$div')
  obj.attrs['x'] = at_void('x')
  obj.assets[LAMBDA] = function(self) {
    return data.toObject(
      dataized(self.take(RHO)) / dataized(self.take('x'))
    )
  }
  return obj
}

module.exports = int$div
